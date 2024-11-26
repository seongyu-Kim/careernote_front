import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertStore, useModal } from '@stores/store';
import { useUserStore } from '@stores/userStore';
import { usePostStore } from '@stores/usePostStore';
import apiUtils from '@utils/apiUtils';
import { USER_API } from '@routes/apiRoutes';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';
import logo_w from '@assets/logo_w.png';
import * as Styled from './Navbar.styled';
import { Button } from '..';
const { USER_DELETE } = USER_API;

interface NavbarProps {
  categories: string[];
}

const Navbar = ({ categories }: NavbarProps) => {
  const navigate = useNavigate();

  const { user, isLogin, logout } = useUserStore();
  const { openAlert, closeAlert } = useAlertStore();
  const { setIsOpen, setModalState } = useModal();
  const { setCategory } = usePostStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>('전체게시판');

  //햄버거 메뉴
  const toggleMenu = () => {
    if (!isLogin) {
      SuccessToast('로그인을 먼저 진행해 주세요');
      return;
    }
    setIsMenuOpen((prevState) => !prevState);
  };

  // 카테고리 변경
  const handleCategoryChange = (category: string) => {
    //선택메뉴
    setSelectedMenu(category);
    setCategory(category);
    navigate('/posts');
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  //로그아웃
  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate('/login');
      SuccessToast('로그아웃 되었습니다.');
    } catch (error) {
      ErrorToast('로그아웃에 실패했습니다.');
      console.error(error);
    }
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

        <Styled.Logo
          onClick={() => {
            const targetPath = user?.level.name === '관리자' ? '/admin' : '/posts';
            window.location.href = targetPath;
          }}>
          <Styled.LogoImg src={logo_w} alt="logo" />
        </Styled.Logo>

        {isLogin && user ? (
          <Styled.LogoutBox>
            <Styled.UserNameText>
              {user?.level?.name === '꼬꼬닭' ? '🐔' : user?.level?.name === '삐약이' ? '🐣' : '⭐'}
              {user?.nickName}
            </Styled.UserNameText>{' '}
            님<Styled.Logout onClick={handleLogout}>Logout</Styled.Logout>
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
            <Styled.MyInfoTitle>내 정보</Styled.MyInfoTitle>
            <Styled.NickNameContainer>
              <Styled.UserName>{user?.nickName} 님</Styled.UserName>
              <Styled.UserLevel>
                {user?.level?.name}{' '}
                {user?.level?.name === '꼬꼬닭'
                  ? '🐔'
                  : user?.level?.name === '삐약이'
                    ? '🐣'
                    : '⭐'}
              </Styled.UserLevel>
            </Styled.NickNameContainer>
            <Styled.EditBtnContainer>
              <Button
                border="1px solid #79b0cb"
                textColor="#79b0cb"
                fontSize="12px"
                padding="3px"
                onClick={() => {
                  setModalState('MyInfo');
                  setIsOpen(true);
                }}>
                내 정보 수정
              </Button>
            </Styled.EditBtnContainer>
            <Styled.Hr />
            <Styled.UserInfoDetails>
              <Styled.UserInfoItem onClick={() => (window.location.href = '/mypage?page=1')}>
                내가 쓴 글
              </Styled.UserInfoItem>
              <div>{user?.boards.length}</div>
            </Styled.UserInfoDetails>
            <Styled.QuitBtn onClick={confirmQuit}>회원탈퇴</Styled.QuitBtn>
          </Styled.UserInfo>

          {user?.level?.name !== '관리자' &&
            categories.map((category) => (
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
