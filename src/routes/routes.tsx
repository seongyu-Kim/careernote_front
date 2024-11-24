import App from 'App';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '@pages/user/Main/Main';
import Login from '@pages/user/Login/Login';
import RegisterPage from '@pages/user/Register/RegisterPage';
import ResetPassword from '@pages/user/ResetPassword/ResetPassword';
import PostView from '@pages/user/PostView/PostView';
import WritePost from '@pages/user/WritePost/WritePost';
import AdminMain from '@pages/admin/Main/AdminMain';
import AdminWritePost from '@pages/admin/WritePost/AdminWritePost';
import AdminPostView from '@pages/admin/PostView/AdminPostView';
import ErrorPage from '@pages/user/Error/ErrorPage';
import PrivateRoutes from './privateRoutes';
import NoAuthPage from '@pages/admin/NoAuthPage/NoAuthPage';

export const ROUTE_LINK = {
  LANDING: { path: '/', link: '/' },
  LOGIN: { path: 'login', link: '/login' },
  REGISTER: { path: 'register', link: '/register' },
  RESET_PASSWORD: { path: 'reset-pw/:token?', link: '/reset-pw/:token?' },
  MAIN: { path: 'posts', link: '/posts' },
  MYPAGE: { path: 'mypage', link: '/mypage' },
  POST_VIEW: { path: 'post/:postId', link: '/post/:postId' },
  WRITE_POST: { path: 'write', link: '/write' },
  ADMIN_MAIN: { path: 'admin', link: '/admin' },
  ADMIN_WRITE: { path: 'admin-write', link: '/admin-write' },
  ADMIN_POST_VIEW: { path: 'admin/post/:postId', link: '/admin/post/:postId' },
  NOAUTH: { path: '/not-authorized', link: '/not-authorized' },
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
        element: <PrivateRoutes authentication={false} />,
        children: [
          {
            path: '',
            element: <Login />,
          },
        ],
      },
      {
        path: ROUTE_LINK.REGISTER.path,
        element: <PrivateRoutes authentication={false} />,
        children: [
          {
            path: '',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: ROUTE_LINK.RESET_PASSWORD.path,
        element: <PrivateRoutes authentication={false} />,
        children: [
          {
            path: '',
            element: <ResetPassword />,
          },
        ],
      },
      { path: ROUTE_LINK.MAIN.path, element: <Main /> },
      { path: ROUTE_LINK.MYPAGE.path, element: <Main /> },
      {
        path: ROUTE_LINK.POST_VIEW.path,
        element: <PrivateRoutes authentication={true} />,
        children: [
          {
            path: '',
            element: <PostView />,
          },
        ],
      },
      {
        path: ROUTE_LINK.WRITE_POST.path,
        element: <PrivateRoutes authentication={true} />,
        children: [
          {
            path: '',
            element: <WritePost />,
          },
        ],
      },
      {
        path: ROUTE_LINK.ADMIN_MAIN.path,
        element: <PrivateRoutes authentication={true} adminOnly={true} />,
        children: [
          {
            path: '',
            element: <AdminMain />,
          },
        ],
      },
      {
        path: ROUTE_LINK.ADMIN_WRITE.path,
        element: <PrivateRoutes authentication={true} adminOnly={true} />,
        children: [
          {
            path: '',
            element: <AdminWritePost />,
          },
        ],
      },
      {
        path: ROUTE_LINK.ADMIN_POST_VIEW.path,
        element: <PrivateRoutes authentication={true} adminOnly={true} />,
        children: [
          {
            path: '',
            element: <PostView />,
          },
        ],
      },
    ],
  },
  { path: ROUTE_LINK.ERROR.path, element: <ErrorPage /> },
  { path: ROUTE_LINK.NOAUTH.path, element: <NoAuthPage /> },
];

const router = createBrowserRouter(routes);

export default router;
