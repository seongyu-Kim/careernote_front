import React, { useState, useEffect } from 'react';
import * as Styled from './Navbar.styled';
import logo_w from '@assets/logo_w.png';
import Alert from '@components/Modal/Alert';
import { useNavigate } from 'react-router-dom';
// import useCategoryStore from '@stores/useCategoryStore';

interface NavProps {
  isOpen: boolean;
  message: string;
  openModal: (message: string) => void;
  closeModal: () => void;
}

const Navbar: React.FC<NavProps> = ({ isOpen, message, openModal, closeModal }) => {
  const navigate = useNavigate();
  // const { selectedCategory, setSelectedCategory } = useCategoryStore();
  const categories = ['자유게시판', '공지', '등업', '취업', '스터디'];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('자유게시판');

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // const handleMenuItemClick = (category: string) => {
  //   setSelectedCategory(category);
  //   setTimeout(() => {
  //     setIsMenuOpen(false);
  //   }, 100);
  // };

  const handleMenuItemClick = (category: string) => {
    setSelectedMenu(category);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  // 로그아웃, 회원탈퇴 API 호출
  const handleQuitClick = () => {
    console.log('회원탈퇴 완료');
    // 탈퇴 API 호출 로직
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
    console.log('모달 닫기', isOpen);
  };

  return (
    <>
      {/* 네비게이션바 */}
      <Styled.Nav>
        <Styled.MenuButton onClick={toggleMenu}>☰</Styled.MenuButton>

        <Styled.Logo onClick={() => navigate('/posts')}>
          <Styled.LogoImg src={logo_w} alt="logo" />
        </Styled.Logo>

        <Styled.LogoutBox>
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ color: '#325366' }}>김선규</div> 님
          </div>
          <div
            // 로그아웃
            style={{ cursor: 'pointer' }}>
            Logout
          </div>
        </Styled.LogoutBox>
      </Styled.Nav>

      {/* 사이드바 */}
      {isMenuOpen && (
        <Styled.Menu isOpen={isMenuOpen}>
          <Styled.UserInfo>
            내 정보
            <Styled.UserName>김선규 님 (꼬꼬닭 회원)</Styled.UserName>
            <Styled.Hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
              <div onClick={() => navigate('/mypage')} style={{ cursor: 'pointer' }}>
                내가 쓴 글
              </div>
              <div>12</div>
            </div>
            <Styled.QuitBtn>
              <div onClick={() => openModal('탈퇴 하시겠습니까?')} style={{ marginTop: '2px' }}>
                회원탈퇴
              </div>
            </Styled.QuitBtn>
          </Styled.UserInfo>
          {categories.map((category) => (
            <Styled.MenuItem key={category}>
              <Styled.MenuItemBtn
                // isSelected={selectedCategory === category}
                isSelected={selectedMenu === category}
                onClick={() => handleMenuItemClick(category)}>
                {category}
              </Styled.MenuItemBtn>
            </Styled.MenuItem>
          ))}
        </Styled.Menu>
      )}
      {/* 모달 */}
      <Alert isOpen={isOpen} message={message} onDelete={handleQuitClick} onCancel={handleCancel} />
    </>
  );
};

export default Navbar;
