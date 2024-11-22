import React from 'react';
import * as Styled from './Alert.styled';
import Button from '@components/Button/Button';
import { useAlertStore } from '@stores/store';

const Alert = () => {
  const { isOpen, message, onConfirm, onCancel, closeAlert } = useAlertStore();

  // 모달 오픈 시 배경 스크롤 막기
  const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  if (!isOpen) return null;
  return (
    <Styled.ModalOverlay isOpen={isOpen}>
      <Styled.ModalContainer>
        <Styled.ModalTitle>{message}</Styled.ModalTitle>
        <Styled.ButtonGroup>
          <Button
            useHover={true}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#B1ABAB"
            backgroundColor="#BDBDBD"
            width="70px"
            border="none"
            onClick={() => {
              onCancel();
              closeAlert();
            }}
            textColor="white">
            아니요
          </Button>
          <Button
            useHover={true}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#CD4444"
            backgroundColor="#E25151"
            width="70px"
            border="none"
            onClick={() => {
              onConfirm();
              closeAlert();
            }}
            textColor="white">
            네
          </Button>
        </Styled.ButtonGroup>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>
  );
};

export default Alert;
