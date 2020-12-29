import { modal } from '../../stores';
import type { UserOption } from '../../types';
import ShareList from './ShareList.svelte';
import AddUser from './AddUser.svelte';

export const openShareListModal = ({
    userOptions,
    updateCallback,
    shareFunction,
}: {
    userOptions: Array<UserOption>;
    updateCallback: () => void;
    shareFunction: (userId: string, accessType: string) => Promise<void>;
}) => {
    modal.set({
        component: ShareList,
        show: true,
        props: {
            userOptions,
            updateCallback,
            shareFunction,
        },
        header: 'Share List',
    });
};

export const openAddUserModal = ({
    updateCallback,
    addFunction,
}: {
    updateCallback: () => void;
    addFunction: (userName: string, email: string) => Promise<void>;
}) => {
    modal.set({
        component: AddUser,
        show: true,
        props: {
            updateCallback,
            addFunction,
        },
        header: 'Add User',
    });
};
