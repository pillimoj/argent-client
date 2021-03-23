import type { ActiveUsersData, ChatData, MessagesData } from './ArgentTypes';
import { chatStore } from './stores';

const apiWsUrl = '__apiWsUrl__';

export class SocketHandler {
    socket: WebSocket;
    isActive: boolean;
    unsentMessages: string[];
    retryIntervalId: number | null;

    constructor() {
        this.retryIntervalId = null;
        this.isActive = true;
        this.connect();
    }

    send(message: string) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            this.unsentMessages.push(message);
        }
    }

    dispose() {
        this.isActive = false;
        if (this.retryIntervalId !== null) {
            clearInterval(this.retryIntervalId);
            this.retryIntervalId = null;
        }
        this.socket.close();
    }

    private onOpen = () => {
        this.unsentMessages.forEach((message) => this.socket.send(message));
        if (this.retryIntervalId !== null) {
            clearInterval(this.retryIntervalId);
            this.retryIntervalId = null;
        }
        this.socket.onclose = this.onClose.bind(this);
    };

    private connect() {
        if (!this.isActive) {
            return;
        }
        if (this.socket && this.socket.readyState != WebSocket.CLOSED) {
            throw `Reconnecting to websocket that is ${this.socket.readyState}`;
        }
        this.socket = new WebSocket(`${apiWsUrl}/api/v1/chat`);
        this.unsentMessages = ['getInitialData'];
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
    }

    private onClose() {
        if (!this.isActive) {
            return;
        }
        this.retryIntervalId = setInterval(this.connect.bind(this), 1000);
    }

    private onError() {
        this.socket.close();
    }

    private onMessage(event: MessageEvent<any>) {
        if (!event.data) return;
        var data: ChatData = JSON.parse(event.data);
        if (data.dataType === 'Messages') {
            const messageData = data as MessagesData;
            chatStore.update((store) => {
                const messages = new Map(store.messages);
                messageData.messages.forEach((message) =>
                    messages.set(message.id, message),
                );
                return {
                    ...store,
                    messages,
                };
            });
        } else if (data.dataType === 'ActiveUsers') {
            const activeUsersData = data as ActiveUsersData;
            chatStore.update((store) => ({
                ...store,
                activeUsers: activeUsersData.activeUsers,
            }));
        } else {
            console.error(data);
        }
    }
}
