import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(179, 179, 179, 0.6);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; 
  justify-content: center;
  align-items: center;
  display: flex;
  z-index:200;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 16px;
  margin: 40px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;