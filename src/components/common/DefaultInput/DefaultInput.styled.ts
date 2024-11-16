import styled from 'styled-components';

interface InputProps {
  placeholderColor: string;
  width: string;
  height: string;
  border: string;
  borderRadius: string;
  outline: string;
  backgroundColor: string;
  caretColor: string;
  padding: string;
  margin: string;
  position: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  fontSize?: string;
  textColor?: string;
  focusBorderColor?: string;
}

export const DefaultInput = styled.input<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  outline: ${(props) => props.outline};
  background-color: ${(props) => props.backgroundColor};
  caret-color: ${(props) => props.caretColor};
  padding: ${(props) => props.padding};
  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
  &:focus {
    border-color: ${(props) => props.focusBorderColor};
  }
`;
