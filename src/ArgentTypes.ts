export type Role = 'User' | 'Admin';
export type AuthStatus = 'Initial' | 'Authenticated' | 'NeedsLogin';
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

export interface UserOption {
    id: string;
    name: string;
}

export interface List {
    id: string;
    name: string;
}
export interface ListItem {
    id: string;
    title: string;
    done: boolean;
    createdAt: number;
}

export interface WishlistItem {
    id: string;
    title: string;
    description: string;
    takenBy: string | null;
    user: string;
}

export interface GameStatus {
    user: string;
    highestCleared: number;
}

type DataType = 'Messages' | 'ActiveUsers';

export interface ChatData {
    dataType: DataType;
}

export interface MessagesData extends ChatData {
    messages: ChatMessage[];
}

export interface ActiveUsersData extends ChatData {
    activeUsers: string[];
}
export interface ChatMessage extends ChatData {
    id: string;
    senderId: string;
    messageText: string;
    sender: string;
}
