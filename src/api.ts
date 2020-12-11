import { auth } from './stores';

const apiUrl = '__apiUrl__';

interface ClientConfig extends RequestInit {
    body?: any;
}

export async function client(
    endpoint: string,
    { body, ...customConfig }: ClientConfig = {},
) {
    const headers = {
        'content-type': 'application/json',
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
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        return await Promise.reject(data);
    }
}
