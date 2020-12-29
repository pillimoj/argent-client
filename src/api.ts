import { auth } from './stores';

const apiUrl = '__apiUrl__';

interface ClientConfig extends RequestInit {
    body?: any;
}

interface ClientError {
    error: any;
}

export async function client<T>(
    endpoint: string,
    { body, ...customConfig }: ClientConfig = {},
): Promise<T> {
    const headers = {
        'content-type': 'application/json',
    };

    const config: RequestInit = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        body: undefined,
        credentials: 'include',
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    let response;
    try {
        response = await window.fetch(apiUrl + endpoint, config);
    } catch (error) {
        return await Promise.reject({ error });
    }
    if (response.ok) {
        return await response.json();
    } else {
        let text = await response.text();
        try {
            const data = JSON.parse(text);
            if (data?.error === 'Unauthorized') {
                auth.set('NeedsLogin');
            }
            text = data?.error ?? data;
        } catch {}
        return await Promise.reject(text);
    }
}
