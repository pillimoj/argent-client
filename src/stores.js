import { writable } from 'svelte/store';

export const auth = writable({ isLoggedIn: false });
export const user = writable({
    email: '',
    given_name: '',
    family_name: '',
});

export const modal = writable({
    show: false,
    // component: null,
    // props: null,
    // header: null,
});
