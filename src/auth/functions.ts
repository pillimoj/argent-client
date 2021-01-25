import router from 'page';
import type { User } from '../ArgentTypes';
import { client } from '../api';
import google from './google';
import { authStatus, user } from './store';

const tokenLogin = async (token) => {
    const userResponse = await client<User>('api/v1/login', {
        headers: { Authorization: `Bearer ${token}` },
    });
    user.set(userResponse);
    authStatus.set('Authenticated');
};

export const logout = async () => {
    await Promise.all([google.logout(), client('api/v1/logout')]);
    user.set(null);
    authStatus.set('NeedsLogin');
    router.show('/');
};

export const login = async () => {
    await google.login();
    const token = await google.getToken();
    tokenLogin(token);
};

export const checkAuthStatus = async () => {
    let sucessfullyAuthenticated = false;
    try {
        const userResponse = await client<User>('api/v1/me');
        user.set(userResponse);
        authStatus.set('Authenticated');
        sucessfullyAuthenticated = true;
    } catch {}
    if (!sucessfullyAuthenticated) {
        try {
            if (await google.isLoggedIn()) {
                const token = await google.getToken();
                await tokenLogin(token);
                sucessfullyAuthenticated = true;
            }
        } catch {}
    }
    if (!sucessfullyAuthenticated) {
        authStatus.set('NeedsLogin');
    }
};
