import React, { useState } from 'react';
import * as Styled from './Navbar.styled';
import logo_w from '@assets/logo_w.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = (menuName: string) => {
    setSelectedMenu(menuName);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  return (
    <>
      {/* 네비게이션바 */}
      <Styled.Nav>
        <Styled.MenuButton onClick={toggleMenu}>☰</Styled.MenuButton>

        <Styled.Logo>
          <Styled.LogoImg src={logo_w} alt="logo" />
        </Styled.Logo>

        <Styled.UserInfo>
          <Styled.Button style={{ marginTop: '2px' }}>김선규 님</Styled.Button>
          <Styled.Button>Logout</Styled.Button>
        </Styled.UserInfo>
      </Styled.Nav>

      {/* 사이드바 */}
      {isMenuOpen && (
        <Styled.Menu isOpen={isMenuOpen}>
          <Styled.MenuItem>
            <Styled.MenuItemBtn
              isSelected={selectedMenu === '자유게시판'}
              onClick={() => handleMenuItemClick('자유게시판')}>
              자유게시판
            </Styled.MenuItemBtn>
          </Styled.MenuItem>
          <Styled.MenuItem>
            <Styled.MenuItemBtn
              isSelected={selectedMenu === '공지'}
              onClick={() => handleMenuItemClick('공지')}>
              공지
            </Styled.MenuItemBtn>
          </Styled.MenuItem>
          <Styled.MenuItem>
            <Styled.MenuItemBtn
              isSelected={selectedMenu === '등업'}
              onClick={() => handleMenuItemClick('등업')}>
              등업
            </Styled.MenuItemBtn>
          </Styled.MenuItem>
          <Styled.MenuItem>
            <Styled.MenuItemBtn
              isSelected={selectedMenu === '취업'}
              onClick={() => handleMenuItemClick('취업')}>
              취업
            </Styled.MenuItemBtn>
          </Styled.MenuItem>
          <Styled.MenuItem>
            <Styled.MenuItemBtn
              isSelected={selectedMenu === '스터디'}
              onClick={() => handleMenuItemClick('스터디')}>
              스터디
            </Styled.MenuItemBtn>
          </Styled.MenuItem>
        </Styled.Menu>
      )}
    </>
  );
};

export default Navbar;
