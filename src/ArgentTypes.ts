export type Role = 'User' | 'Admin';
export type AuthStatus = 'Initial' | 'Authenticated' | 'NeedsLogin';
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
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
