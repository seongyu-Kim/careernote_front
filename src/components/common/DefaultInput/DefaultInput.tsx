import * as Styled from './DefaultInput.styled';
import React, { ReactNode } from 'react';

interface DefaultInputProps {
  children?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  placeholderColor?: string;
  type?: string;
  value?: string;
  width?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
  outline?: string;
  backgroundColor?: string;
  caretColor?: string;
  padding?: string;
  margin?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  fontSize?: string;
  textColor?: string;
  focusBorderColor?: string;
}

const DefaultInput = ({
  children,
  onChange,
  placeholder,
  placeholderColor = 'black',
  type = 'text',
  value,
  width = 'auto',
  height = 'auto',
  border = '1px solid black',
  borderRadius = '9px',
  outline = 'none',
  backgroundColor = 'white',
  caretColor = 'black',
  padding = '0',
  margin = '0',
  position = 'static',
  top,
  bottom,
  left,
  right,
  fontSize,
  textColor = 'black',
  focusBorderColor = 'none',
}: DefaultInputProps) => {
  return (
    <Styled.DefaultInput
      onChange={onChange}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      type={type}
      value={value}
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      outline={outline}
      backgroundColor={backgroundColor}
      caretColor={caretColor}
      padding={padding}
      margin={margin}
      position={position}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      fontSize={fontSize}
      textColor={textColor}
      focusBorderColor={focusBorderColor}>
      {children}
    </Styled.DefaultInput>
  );
};

export default DefaultInput;
