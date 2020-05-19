import { writable } from 'svelte/store';

export const user = writable({ isLoggedIn: false });

export const modal = writable({
    show: false,
    // component: null,
    // props: null,
    // header: null,
});
