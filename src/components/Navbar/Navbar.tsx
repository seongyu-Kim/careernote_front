import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { USER_API } from '@routes/apiRoutes';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';
import logo_w from '@assets/logo_w.png';
import * as Styled from './Navbar.styled';

const { USER_DELETE } = USER_API;

interface NavbarProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
}

const Navbar = ({ categories, onCategoryChange }: NavbarProps) => {
  const navigate = useNavigate();

  const { user, isLogin, logout } = useUserStore();
  const { openAlert, closeAlert } = useAlertStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>('자유게시판');

  // 햄버거 메뉴
  const toggleMenu = () => {
    if (!isLogin) {
      SuccessToast('로그인을 먼저 진행해 주세요');
      return;
    }
    setIsMenuOpen((prevState) => !prevState);
  };

  // 카테고리 변경
  const handleCategoryChange = (category: string) => {
    setSelectedMenu(category);
    onCategoryChange(category);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  // 로그아웃
  const handleLogout = () => {
    logout();
    navigate('/login');
    SuccessToast('로그아웃 되었습니다.');
  };

  // 회원 탈퇴
  const handleQuitClick = async (user_id: string) => {
    try {
      await apiUtils({
        url: USER_DELETE,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { user_id },
      });
      logout();
      navigate('/login');
      SuccessToast('탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('탈퇴 실패:', error);
      ErrorToast('탈퇴에 실패하였습니다.');
    }
  };

  // 탈퇴 모달
  const confirmQuit = () => {
    if (user?.user_id) {
      openAlert('탈퇴 하시겠습니까?', () => handleQuitClick(user.user_id), closeAlert);
    } else {
      ErrorToast('유효하지 않은 사용자입니다.');
    }
  };

  return (
    <>
      <Styled.Nav>
        <Styled.MenuButton onClick={toggleMenu}>☰</Styled.MenuButton>

        <Styled.Logo onClick={() => navigate('/posts')}>
          <Styled.LogoImg src={logo_w} alt="logo" />
        </Styled.Logo>

        {isLogin && user ? (
          <Styled.LogoutBox>
            <Styled.UserNameText>{user?.nickName}</Styled.UserNameText> 님
            <Styled.Logout onClick={handleLogout}>Logout</Styled.Logout>
          </Styled.LogoutBox>
        ) : (
          <Styled.LogoutBox>
            <Styled.Logout onClick={() => navigate('/login')}>Login</Styled.Logout>
          </Styled.LogoutBox>
        )}
      </Styled.Nav>

      {isMenuOpen && isLogin && (
        <Styled.Menu $isOpen={isMenuOpen}>
          <Styled.UserInfo>
            내 정보
            <Styled.UserName>
              {user?.nickName} 님 ({user?.level?.name} 회원)
            </Styled.UserName>
            <Styled.Hr />
            <Styled.UserInfoDetails>
              <Styled.UserInfoItem onClick={() => navigate('/mypage')}>
                내가 쓴 글
              </Styled.UserInfoItem>
              <div>{user?.boards.length}</div>
            </Styled.UserInfoDetails>
            <Styled.QuitBtn onClick={confirmQuit}>회원탈퇴</Styled.QuitBtn>
          </Styled.UserInfo>

          {categories.map((category) => (
            <Styled.MenuItem key={category}>
              <Styled.MenuItemBtn
                $isSelected={selectedMenu === category}
                onClick={() => handleCategoryChange(category)}>
                {category}
              </Styled.MenuItemBtn>
            </Styled.MenuItem>
          ))}
        </Styled.Menu>
      )}
    </>
  );
};

export default Navbar;
