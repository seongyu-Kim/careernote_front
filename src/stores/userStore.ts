import { create } from 'zustand';

interface UserState {
  user: {
    user_id: string;
    email: string;
    nickName: string;
    level_id: string;
    levelName: string;
    created_at: string;
    accessToken: string;
  } | null;
  token: string | null;
  isLogin: boolean;
  login: ({ user_id, email, nickname, level_id, levelName, createdAt, accessToken }: User) => void;
  logout: () => void;
}

interface User {
  user_id: string;
  email: string;
  nickname: string;
  level_id: string;
  levelName: string;
  createdAt: string;
  accessToken: string;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isLogin: false,

  login: ({ user_id, email, nickname, level_id, levelName, createdAt, accessToken }: User) => {
    set({
      user: {
        user_id,
        email,
        nickName: nickname,
        level_id,
        levelName,
        created_at: createdAt,
        accessToken,
      },
      isLogin: true,
      token: accessToken,
    });
    localStorage.setItem('token', JSON.stringify(accessToken));
  },
  logout: () => {
    set({ user: null, isLogin: false, token: null });
    localStorage.removeItem('token');
  },
}));
