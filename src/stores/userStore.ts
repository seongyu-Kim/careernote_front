import { create } from 'zustand';

interface UserState {
  user: { email: string; nickName: string; level: string };
}

export const useUserStore = create<UserState>();
