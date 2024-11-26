import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean; // true: 로그인 상태만 접근 가능, false: 비로그인 상태만 접근 가능
  adminOnly?: boolean; // true: 관리자만 접근 가능
}

const PrivateRoutes = ({ authentication, adminOnly }: PrivateRouteProps): React.ReactElement => {
  const isAuthenticated = !!localStorage.getItem('token'); // 로그인 여부 확인
  const userRole = localStorage.getItem('role'); // 사용자 권한 확인

  if (authentication) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (adminOnly && userRole !== '관리자') {
      return <Navigate to="/not-authorized" />;
    }

    return <Outlet />;
  } else {

    return <Outlet />;
  }
};
export default PrivateRoutes;