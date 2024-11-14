import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};  // isOpen이 true일 때만 block, 아니면 none
  justify-content: center;
  align-items: center;
  display: flex;
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
  margin: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const Button = styled.button<{ color: string }>`
  padding: 5px 10px;
  border: none;
  width: 70px;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => props.color};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.color === '#f44336' ? '#d32f2f' : '#bdbdbd')};
  }
`;
