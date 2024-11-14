import React from 'react';
import * as Styled from './MainLayout.styled';
import Navbar from '@components/Navbar/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Styled.MainBox>
      <Navbar />
      <Styled.ContentBox>{children}</Styled.ContentBox>
    </Styled.MainBox>
  );
};

export default MainLayout;
