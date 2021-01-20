import { writable } from 'svelte/store';

interface ModalState {
    show: boolean;
    component?: any;
    props?: object;
}

export const modal = writable<ModalState>({
    show: false,
    component: null,
    props: null,
});
