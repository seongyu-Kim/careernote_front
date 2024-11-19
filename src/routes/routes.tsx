import App from 'App';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '@pages/user/Main/Main';
import Login from '@pages/user/Login/Login';
import Register from '@pages/user/Register/Register';
import ResetPassword from '@pages/user/ResetPassword/ResetPassword';
import PostView from '@pages/user/PostView/PostView';
import WritePost from '@pages/user/WritePost/WritePost';
import AdminMain from '@pages/admin/Main/AdminMain';
import AdminWritePost from '@pages/admin/WritePost/AdminWritePost';
import AdminPostView from '@pages/admin/PostView/AdminPostView';
import ErrorPage from '@pages/user/Error/ErrorPage';

export const ROUTE_LINK = {
  LANDING: { path: '/', link: '/' },
  LOGIN: { path: 'login', link: '/login' },
  REGISTER: { path: 'register', link: '/register' },
  RESET_PASSWORD: { path: 'reset-pw/:token?', link: '/reset-pw/:token?' },
  MAIN: { path: 'posts', link: '/posts' },
  MYPAGE: { path: 'mypage', link: '/mypage' },
  POST_VIEW: { path: 'posts/:postId', link: '/posts/:postId' },
  WRITE_POST: { path: 'write', link: '/write' },
  ADMIN_MAIN: { path: 'admin', link: '/admin' },
  ADMIN_WRITE: { path: 'admin-write', link: '/admin-write' },
  ADMIN_POST_VIEW: { path: 'admin/posts/:postId', link: '/admin/posts/:postId' },
  ERROR: { path: '*', link: '/*' },
};

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      // 사용자 기능
      {
        path: ROUTE_LINK.LOGIN.path,
        element: <Login />,
      },
      {
        path: ROUTE_LINK.REGISTER.path,
        element: <Register />,
      },
      {
        path: ROUTE_LINK.RESET_PASSWORD.path,
        element: <ResetPassword />,
      },
      {
        path: ROUTE_LINK.MAIN.path,
        element: <Main />,
      },
      {
        path: ROUTE_LINK.MYPAGE.path,
        element: <Main />,
      },
      {
        path: ROUTE_LINK.POST_VIEW.path,
        element: <PostView />,
      },
      {
        path: ROUTE_LINK.WRITE_POST.path,
        element: <WritePost />,
      },
      {
        path: ROUTE_LINK.WRITE_POST.path,
        element: <WritePost />,
      },

      // 관리자 기능
      {
        path: ROUTE_LINK.ADMIN_MAIN.path,
        element: <AdminMain />,
      },
      {
        path: ROUTE_LINK.ADMIN_WRITE.path,
        element: <AdminWritePost />,
      },
      {
        path: ROUTE_LINK.ADMIN_POST_VIEW.path,
        element: <AdminPostView />,
      },
    ],
  },
  { path: ROUTE_LINK.ERROR.path, element: <ErrorPage /> },
];

const router = createBrowserRouter(routes);

export default router;
