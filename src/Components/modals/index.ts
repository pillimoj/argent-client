import { modal } from '../../stores';

export const closeModal = () => modal.set({ show: false });
