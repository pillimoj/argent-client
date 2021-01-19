import { writable } from 'svelte/store';

type Role = 'User' | 'Admin';
type AuthStatus = 'Initial' | 'Authenticated' | 'NeedsLogin';
interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

interface ModalState {
    show: boolean;
    component?: any;
    props?: object;
}

type Newable<T> = { new (...args: any[]): T };

export const auth = writable<AuthStatus>('Initial');
export const user = writable<User | null>(null);

export const modal = writable<ModalState>({
    show: false,
    component: null,
    props: null,
});
