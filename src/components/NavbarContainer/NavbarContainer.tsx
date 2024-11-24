import React from 'react';
import * as Styled from './NavbarContainer.styled';
import { Navbar } from 'components';

interface NavbarContainerProps {
  children: React.ReactNode;
}

const categories = ['자유게시판', '공지', '등업', '취업정보', '스터디'];

const NavbarContainer = ({ children }: NavbarContainerProps) => {
  return (
    <Styled.MainBox>
      <Navbar categories={categories} />
      <Styled.ContentBox>{children}</Styled.ContentBox>
    </Styled.MainBox>
  );
};

export default NavbarContainer;
