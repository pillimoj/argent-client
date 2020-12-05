import { writable } from 'svelte/store';

type Role = 'User' | 'Admin';
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
    header?: string;
}

type Newable<T> = { new (...args: any[]): T };

export const auth = writable({ isLoggedIn: false, idToken: undefined });
export const user = writable<User | null>(null);

export const modal = writable<ModalState>({
    show: false,
    component: null,
    props: null,
    header: null,
});
