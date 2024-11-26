import styled from 'styled-components';
import { InputProps } from '@/type/input';

export const DefaultInput = styled.input<InputProps>`
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
    border-color: ${(props) => props.focusBorderColor};
  }
`;
