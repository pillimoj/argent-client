import { authStatus } from './auth/store';

const apiUrl = '__apiUrl__';

type Method = 'GET' | 'POST' | 'DELETE';

interface RequestConfig {
    endpoint: string;
    body?: any;
    method: Method;
    customConfig: RequestInit;
}

async function request<T>(conf: RequestConfig): Promise<T> {
    if (conf.body && conf.method != 'POST') {
        throw new Error(`${conf.method} requests cannot have a body`);
    }
    const headers = {
        'content-type': 'application/json',
    };

    const requestInit: RequestInit = {
        ...conf.customConfig,
        method: conf.method,
        headers: {
            ...headers,
            ...conf.customConfig.headers,
        },
        body: undefined,
        credentials: 'include',
    };
    if (conf.body) {
        requestInit.body = JSON.stringify(conf.body);
    }
    let response;
    try {
        response = await window.fetch(apiUrl + conf.endpoint, requestInit);
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
                authStatus.set('Initial');
            }
            text = data?.error ?? data;
        } catch {}
        return await Promise.reject(text);
    }
}

async function get<T>(
    endpoint: string,
    body?: any,
    customConfig: RequestInit = {},
): Promise<T> {
    return request<T>({ endpoint, body, method: 'GET', customConfig });
}
async function post<T>(
    endpoint: string,
    body?: any,
    customConfig: RequestInit = {},
): Promise<T> {
    return request<T>({ endpoint, body, method: 'POST', customConfig });
}
async function del<T>(
    endpoint: string,
    body?: any,
    customConfig: RequestInit = {},
): Promise<T> {
    return request<T>({ endpoint, body, method: 'DELETE', customConfig });
}

export default {
    get,
    post,
    del,
};
