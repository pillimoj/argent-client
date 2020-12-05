import { modal } from '../stores';
import type { UserOption } from '../types';
import ShareList from './ShareList.svelte';

export const closeModal = () => modal.set({ show: false });

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
