import styled from 'styled-components';
import { InputProps } from '@/type/input';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

export const Label = styled.label<{ isActive: boolean }>`
  position: absolute;
  left: 10px;
  top: ${(props) => (props.isActive ? '-9px' : '50%')};
  font-size: ${(props) => (props.isActive ? '15px' : '16px')};
  color: ${(props) => (props.isActive ? '#79b0c8' : '#79b0c8')};
  cursor: text;
  transition: all 0.2s ease;
  transform: translateY(${(props) => (props.isActive ? '0' : '-50%')});
  z-index: 2;
  background-color: ${(props) => (props.isActive ? 'white' : 'none')};
  padding: 0 5px 0 5px;
  border-radius: 8px;
  user-select: none;
`;

export const AuthenticationInput = styled.input<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  outline: ${(props) => props.outline};
  background-color: ${(props) => props.backgroundColor};
  caret-color: ${(props) => props.caretColor};
  padding: ${(props) => props.padding};
  cursor: text;
  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
  &:focus {
    border-color: ${(props) => (props.isActive ? '#79b0c8' : '#79b0c8')};
    box-shadow: ${(props) => (props.isActive ? '0 2px 6px rgba(0, 0, 0, 0.4)' : 'none')};
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease; /* 포커스 상태에서도 서서히 변화 */
  }
  &:not(:focus) {
    border-color: #b3d5eb; /* 기본 border 색상 */
    box-shadow: none; /* 기본 상태에서 그림자 없음 */
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease; /* 서서히 변화 */
  }
`;
