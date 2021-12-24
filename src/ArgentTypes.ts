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

export interface UserAccess {
    id: string;
    name: String;
    checklistAccessType: 'Owner' | 'Editor';
}

export interface List {
    id: string;
    name: string;
}
export interface ListItem {
    id: string;
    title: string;
    checklist: string;
    done: boolean;
    createdAt: number;
}

export interface GameStatus {
    user: string;
    highestCleared: number;
}
