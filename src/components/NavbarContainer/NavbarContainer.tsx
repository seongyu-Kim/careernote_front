import React from 'react';
import * as Styled from './NavbarContainer.styled';
import Navbar from '@components/Navbar/Navbar';

const NavbarContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Styled.MainBox>
      <Navbar />
      <Styled.ContentBox>{children}</Styled.ContentBox>
    </Styled.MainBox>
  );
};

export default NavbarContainer;
