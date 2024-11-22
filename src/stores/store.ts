import { create } from 'zustand';

interface AlertStore {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  openAlert: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  closeAlert: () => void;
}

//
interface ModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalState: '' | 'findPassword' | 'MyInfo' | 'addCategory';
  setModalState: (modalState: '' | 'findPassword' | 'MyInfo' | 'addCategory') => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: () => {},
  onCancel: () => {},
  openAlert: (message, onConfirm, onCancel = () => {}) =>
    set({ isOpen: true, message, onConfirm, onCancel }),
  closeAlert: () => set({ isOpen: false, message: '', onConfirm: () => {}, onCancel: () => {} }),
}));
//모달 ON OFF & 모달 상태 설정
export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  modalState: '',
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen }),
  setModalState: (value) => {
    set({ modalState: value });
  },
}));
