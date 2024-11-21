import React from 'react';
import * as Styled from './NavbarContainer.styled';
import { Navbar } from 'components';
import { usePostStore } from '@stores/usePostStore';

interface NavbarContainerProps {
  children: React.ReactNode;
}

const categories = ['자유게시판', '공지', '등업', '취업정보', '스터디'];

const NavbarContainer = ({ children }: NavbarContainerProps) => {
  const { setCategory } = usePostStore();

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <Styled.MainBox>
      <Navbar categories={categories} onCategoryChange={handleCategoryChange} />
      <Styled.ContentBox>{children}</Styled.ContentBox>
    </Styled.MainBox>
  );
};

export default NavbarContainer;
