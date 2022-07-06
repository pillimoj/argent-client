import router from 'page';
import type { User } from '../ArgentTypes';
import { client } from '../api';
import {} from './google';
import { authStatus, user } from './store';
import google from './google';

export const logout = async () => {
    await client('api/v1/logout');
    user.set(null);
    authStatus.set('NeedsLogin');
    router.show('/');
};

export const prompt = () => {
    google.prompt();
};

export const checkAuthStatus = async () => {
    let sucessfullyAuthenticated = false;
    try {
        const userResponse = await client<User>('api/v1/me');
        user.set(userResponse);
        authStatus.set('Authenticated');
        sucessfullyAuthenticated = true;
    } catch {
        authStatus.set('NeedsLogin');
        google.prompt();
    }
};
