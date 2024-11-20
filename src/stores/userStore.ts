import { create } from 'zustand';
import { USER_API } from '@routes/apiRoutes';
import apiUtils from '@utils/apiUtils';

interface Level {
  _id: string;
  name: string;
}

interface Board {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  email: string;
  nickname: string;
  level: Level;
  boards: Board[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  accessToken: string;
}

interface UserState {
  user: {
    user_id: string;
    email: string;
    nickName: string;
    level: Level;
    boards: Board[];
    created_at: string;
    updated_at: string;
    __v: number;
    accessToken: string;
  } | null;
  token: string | null;
  isLogin: boolean;
  login: ({
    _id,
    email,
    nickname,
    level,
    boards,
    createdAt,
    updatedAt,
    __v,
    accessToken,
  }: User) => void;
  logout: () => void;
  loginRestore: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isLogin: false,

  login: ({
    _id,
    email,
    nickname,
    level,
    boards,
    createdAt,
    updatedAt,
    __v,
    accessToken,
  }: User) => {
    const newState = {
      user: {
        user_id: _id,
        email,
        nickName: nickname,
        level,
        boards,
        created_at: createdAt,
        updated_at: updatedAt,
        __v,
        accessToken,
      },
      isLogin: true,
      token: accessToken,
    };

    set(newState);

    localStorage.setItem('token', JSON.stringify(newState.token));
    localStorage.setItem('isLogin', JSON.stringify(newState.isLogin));
  },
  logout: async () => {
    const { LOGOUT } = USER_API;
    try {
      await apiUtils({
        url: LOGOUT,
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        withAuth: false,
      });
    } catch (error) {
      console.log(error);
    }
    set({ user: null, isLogin: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
  },
  //새로 고침 시 로그인 상태에 따라 유저 정보 재요청
  loginRestore: async () => {
    const isLogin = localStorage.getItem('isLogin') === 'true';
    const token = localStorage.getItem('token');
    if (isLogin && token) {
      try {
        const { USER_ABOUT } = USER_API;
        const res = await apiUtils({
          url: USER_ABOUT,
          method: 'POST',
          data: { token: localStorage.getItem('token') },
          withAuth: false,
        });
        if (res) {
          set({ user: res, isLogin: isLogin, token: token });
        }
      } catch (error) {
        set({ user: null, isLogin: false, token: null });
        console.log('유저 정보 재요청 실패', error);
      }
    }
  },
}));
