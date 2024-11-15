import React, { useState, useEffect } from 'react';
import * as Styled from './Navbar.styled';
import logo_w from '@assets/logo_w.png';
import Alert from '@components/Modal/Alert';
import { useNavigate } from 'react-router-dom';

interface NavProps {
  isOpen: boolean;
  message: string;
  openModal: (message: string) => void;
  closeModal: () => void;
}

const Navbar: React.FC<NavProps> = ({ isOpen, message, openModal, closeModal }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('자유게시판');
  // const [categoryList, setCategoryList] = useState<any[]>([]);

  // 카테고리별 API 호출
  // useEffect(() => {
  //   const fetchCategoryData = async () => {
  //     try {
  //       const response = await axios.get(`/api/category/${selectedMenu}`);
  //       setCategoryList(response.data);
  //     } catch (error) {
  //       console.error('카테고리 데이터를 불러오는 데 실패했습니다:', error);
  //     }
  //   };

  //   fetchCategoryData();
  // }, [selectedMenu]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = (menuName: string) => {
    setSelectedMenu(menuName);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  //공지 숨긴 리스트 API

  //로그아웃 API

  //회원탈퇴
  const handleQuitClick = () => {
    console.log('회원탈퇴 완료');
    //탈퇴 API
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
          <div>김선규 님</div>
          <div
            //로그아웃
            //  onClick={() => ()}
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
      {/* 모달 */}
      <Alert isOpen={isOpen} message={message} onDelete={handleQuitClick} onCancel={handleCancel} />
    </>
  );
};

export default Navbar;
