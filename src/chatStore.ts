import type { ActiveUsersData, ChatData, ChatMessage, MessagesData } from './ArgentTypes';
import { writable } from 'svelte/store';

interface ChatStore {
    messages: ChatMessage[];
    activeUsers: string[];
}

function createChatStore() {
    let socket: WebSocket;
    const { subscribe, update } = writable<ChatStore>(
        { messages: [], activeUsers: [] },
        () => {
            // this function is called once, when the first subscriber to the store arrives

            socket = new WebSocket('ws://localhost:8008/api/v1/chat');

            socket.onmessage = function (event) {
                if (!event.data) return;
                var data: ChatData = JSON.parse(event.data);
                if (data.dataType === 'Messages') {
                    const messageData = data as MessagesData;
                    update((store) => ({
                        ...store,
                        messages: [...store.messages, ...messageData.messages],
                    }));
                } else if (data.dataType === 'ActiveUsers') {
                    const activeUsersData = data as ActiveUsersData;
                    update((store) => ({
                        ...store,
                        activeUsers: activeUsersData.activeUsers,
                    }));
                } else {
                    console.error(data);
                }
            };

            // ... the rest of your socket code

            const dispose = () => {
                socket.close();
            };

            // the function we return here will be called when the last subscriber
            // unsubscribes from the store (hence there's 0 subscribers left)
            return dispose;
        },
    );

    return {
        subscribe,
        sendMessage: (message: string) => socket.send(message),
    };
}

export const chatStore = createChatStore();
