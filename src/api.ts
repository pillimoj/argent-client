import { get } from 'svelte/store';
import { auth } from './stores';

declare var gapi : any;

const apiUrl = '__apiUrl__';

interface ClientConfig extends RequestInit {
    body?: any;
}

export async function client(
    endpoint: string,
    { body, ...customConfig }: ClientConfig = {},
) {
    const token = get(auth).idToken;
    const headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        body: undefined,
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    const response = await window.fetch(apiUrl + endpoint, config);
    if (response.status === 401) {
        refreshToken();
        window.location.assign(window.location.pathname);
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
