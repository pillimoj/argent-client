import { writable } from 'svelte/store';

interface ModalState {
    show: boolean;
    component?: any;
    props?: object;
    onClose?: () => void;
}

export const modal = writable<ModalState>({
    show: false,
    component: null,
    props: null,
});

export const pageTitle = writable('');
