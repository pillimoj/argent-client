import { get } from 'svelte/store';
import { auth } from './stores';

const apiUrl = '__apiUrl__';

export async function client(endpoint: string, { body, ...customConfig } = {}) {
    const token = get(auth).idToken;
    const headers = { 'content-type': 'application/json' };
    headers.Authorization = `Bearer ${token}`;
    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    const response = await window.fetch(apiUrl + endpoint, config);
    if (response.status === 401) {
        refreshToken();
        window.location.assign(window.location);
        return;
    }
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        return await Promise.reject(data);
    }
}

async function refreshToken() {
    const authResponse = await gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .reloadAuthResponse();
    const token = authResponse.id_token;
}
