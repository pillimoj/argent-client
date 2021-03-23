import { writable } from 'svelte/store';
import type { ChatMessage, ChatStore } from './ArgentTypes';

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

export const pageTitle = writable('');

export const chatStore = writable<ChatStore>({
    messages: new Map<string, ChatMessage>(),
    activeUsers: [],
});
