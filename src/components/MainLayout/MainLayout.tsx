import React from 'react';
import * as Styled from './MainLayout.styled';
import Navbar from '@components/Navbar/Navbar';
import { useAlertStore } from '@stores/store';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, message, openModal, closeModal } = useAlertStore();

  return (
    <Styled.MainBox>
      <Navbar isOpen={isOpen} message={message} openModal={openModal} closeModal={closeModal} />
      <Styled.ContentBox>{children}</Styled.ContentBox>
    </Styled.MainBox>
  );
};

export default MainLayout;
