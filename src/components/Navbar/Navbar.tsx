import React, { useState } from 'react';
import * as Styled from './Navbar.styled';
import logo_w from '@assets/logo_w.png';
import { useNavigate } from 'react-router-dom';
import { useAlertStore } from '@stores/store';

interface NavbarProps {
  categories: string[];
}

const Navbar = ({ categories }: NavbarProps) => {
  const { openAlert, closeAlert } = useAlertStore();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('자유게시판');

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = (category: string) => {
    setSelectedMenu(category);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  const handleQuitClick = () => {
    console.log('회원탈퇴 완료');
    closeAlert();
  };

  return (
    <>
      <Styled.Nav>
        <Styled.MenuButton onClick={toggleMenu}>☰</Styled.MenuButton>

        <Styled.Logo onClick={() => navigate('/posts')}>
          <Styled.LogoImg src={logo_w} alt="logo" />
        </Styled.Logo>

        <Styled.LogoutBox>
          <Styled.UserNameText>김선규</Styled.UserNameText> 님
          <Styled.Logout onClick={() => console.log('Logout')}>Logout</Styled.Logout>
        </Styled.LogoutBox>
      </Styled.Nav>

      {isMenuOpen && (
        <Styled.Menu $isOpen={isMenuOpen}>
          <Styled.UserInfo>
            내 정보
            <Styled.UserName>김선규 님 (꼬꼬닭 회원)</Styled.UserName>
            <Styled.Hr />
            <Styled.UserInfoDetails>
              <Styled.UserInfoItem onClick={() => navigate('/mypage')}>
                내가 쓴 글
              </Styled.UserInfoItem>
              <div>12</div>
            </Styled.UserInfoDetails>
            <Styled.QuitBtn onClick={() => openAlert('탈퇴 하시겠습니까?', handleQuitClick)}>
              회원탈퇴
            </Styled.QuitBtn>
          </Styled.UserInfo>
          {categories.map((category) => (
            <Styled.MenuItem key={category}>
              <Styled.MenuItemBtn
                $isSelected={selectedMenu === category}
                onClick={() => handleMenuItemClick(category)}>
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
