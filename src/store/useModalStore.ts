import { create } from 'zustand';

type ModalType = 'confirm' | 'noti' | 'menu' | 'detail' | null;

type ModalState = {
  isOpen: boolean;
  type: ModalType;
  id?: number | null;
  open: (id?: number | null, type?: ModalType) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  type: 'confirm',
  id: null,
  open: (id = null, type = 'confirm') => set({ isOpen: true, id, type }),
  close: () => set({ isOpen: false, id: null, type: null }),
}));
