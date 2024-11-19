import { create } from 'zustand';

interface ValidCheckType {
  validCheck: ValidCheck;
  setValidCheck: (key: keyof ValidCheck, value: boolean) => void;
  resetValidCheck: () => void;
}

interface ValidCheck {
  nickName: boolean;
  email: boolean;
}

export const useValidCheck = create<ValidCheckType>((set) => ({
  validCheck: { nickName: false, email: false },
  setValidCheck: (key: keyof ValidCheck, value: boolean) =>
    set((state) => ({
      validCheck: { ...state.validCheck, [key]: value },
    })),
  resetValidCheck: () => {
    set(() => ({
      validCheck: { nickName: false, email: false },
    }));
  },
}));
