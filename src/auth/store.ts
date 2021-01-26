import type { AuthStatus, User } from '../ArgentTypes';
import { writable } from 'svelte/store';

export const authStatus = writable<AuthStatus>('Initial');
export const user = writable<User | null>(null);
