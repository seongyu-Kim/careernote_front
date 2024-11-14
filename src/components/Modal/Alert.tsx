import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup, ModalContainer, ModalOverlay, ModalTitle } from './Alert.styled';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onDelete: () => void;
  onCancel: () => void;
}

const Alert: React.FC<ModalProps> = ({ isOpen, message, onDelete, onCancel }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer>
        <ModalTitle>{message}</ModalTitle>
        <ButtonGroup>
          <Button color="#f44336" onClick={onDelete}>네</Button>
          <Button color="#BDBDBD" onClick={onCancel}>아니요</Button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Alert;
