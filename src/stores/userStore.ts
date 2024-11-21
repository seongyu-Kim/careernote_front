import { create } from 'zustand';
import { USER_API } from '@routes/apiRoutes';
import apiUtils from '@utils/apiUtils';
import { ErrorToast } from '@utils/ToastUtils';

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
  deleted: boolean;
  boards: Board[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  accessToken: string;
  resetPasswordToken: string | '';
}

interface UserState {
  user: {
    user_id: string;
    email: string;
    nickName: string;
    level: Level;
    deleted?: boolean;
    boards: Board[];
    created_at: string;
    updated_at: string;
    __v: number;
    accessToken: string;
    resetPasswordToken: string;
  } | null;
  token: string | null;
  isLogin: boolean;
  navigate: Function | null;
  setNavigate: (navigate: Function) => void;
  login: ({
    _id,
    email,
    nickname,
    level,
    deleted,
    boards,
    createdAt,
    updatedAt,
    __v,
    accessToken,
    resetPasswordToken,
  }: User) => void;
  logout: () => void;
  loginRestore: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  isLogin: false,
  navigate: null,
  setNavigate: (navigate) => set({ navigate }),
  login: ({
    _id,
    email,
    nickname,
    level,
    deleted,
    boards,
    createdAt,
    updatedAt,
    __v,
    accessToken,
    resetPasswordToken,
  }: User) => {
    const newState = {
      user: {
        user_id: _id,
        email,
        nickName: nickname,
        level,
        deleted,
        boards,
        created_at: createdAt,
        updated_at: updatedAt,
        __v,
        accessToken,
        resetPasswordToken,
      },
      isLogin: true,
      token: accessToken,
    };

    set(newState);
    localStorage.setItem('token', newState.token);
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
    if (!isLogin && !token) {
      return;
    }
    if (isLogin && token) {
      try {
        const { USER_ABOUT } = USER_API;
        const res = await apiUtils({
          url: USER_ABOUT,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.message === '로그인 유저 정보 조회 성공') {
          // 추후 조건 수정
          set({
            user: {
              user_id: res.data._id,
              email: res.data.email,
              nickName: res.data.nickname,
              level: res.data.level,
              deleted: res.data.deleted || false,
              boards: res.data.boards,
              created_at: res.data.createdAt,
              updated_at: res.data.updatedAt,
              __v: res.data.__v,
              accessToken: res.data.accessToken,
              resetPasswordToken: res.data.resetPasswordToken,
            },
            isLogin: isLogin,
            token: token,
          });
          return;
        }
      } catch (error) {
        set({ user: null, isLogin: false, token: null });
        console.log('유저 정보 재요청 실패', error);
        return;
      }
    }
    const navigate = get().navigate;
    if (navigate) {
      ErrorToast('다시 로그인해주세요');
      navigate('/login'); // /login 페이지로 이동
    }
  },
}));
