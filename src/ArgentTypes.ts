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
export interface ComputeEngineStatus {
    status:
    | 'PROVISIONING'
    | 'STAGING'
    | 'RUNNING'
    | 'STOPPING'
    | 'SUSPENDING'
    | 'SUSPENDED'
    | 'REPAIRING'
    | 'TERMINATED';
}

export type ComputeEngineUIStatus =
    | 'Loading'
    | 'Stopped'
    | 'Running'
    | 'Starting'
    | 'Stopping';

export const mapComputeEngineStatus = (
    computeEngineStatus: ComputeEngineStatus,
): ComputeEngineUIStatus => {
    switch (computeEngineStatus.status) {
        case 'PROVISIONING':
        case 'STAGING':
        case 'REPAIRING':
            return 'Starting';
        case 'RUNNING':
            return 'Running';
        case 'SUSPENDING':
        case 'STOPPING':
            return 'Stopping';
        case 'TERMINATED':
        case 'SUSPENDED':
            return 'Stopped';
        default:
            console.warn(`Unknown status ${computeEngineStatus.status}`)
            return 'Loading'
    }
};
