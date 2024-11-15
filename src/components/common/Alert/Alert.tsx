import React, { useEffect } from 'react';
import * as Styled from '@components/common/Alert/Alert.styled';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert: React.FC<ModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
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
          <DefaultButton
            backgroundColor="#E25151"
            width="70px"
            border="none"
            onClick={onConfirm}
            textColor="white">
            네
          </DefaultButton>
          <DefaultButton
            backgroundColor="#BDBDBD"
            width="70px"
            border="none"
            onClick={onCancel}
            textColor="white">
            아니요
          </DefaultButton>
        </Styled.ButtonGroup>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>
  );
};

export default Alert;
