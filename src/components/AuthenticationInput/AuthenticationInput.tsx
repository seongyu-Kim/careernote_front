import React, { useState, FocusEvent } from 'react';
import * as Styled from './AuthenticationInput.styled';
import { InputProps } from '@/type/input';

const AuthenticationInput = ({
  forValue,
  labelPlaceHolder,
  children,
  onChange,
  placeholder,
  placeholderColor = 'black',
  type = 'text',
  value,
  width = '100%',
  height = '40px',
  border = '1px solid #b3d5eb',
  borderRadius = '9px',
  outline = 'none',
  backgroundColor = '#f0f7fb',
  caretColor = '#79b0c8',
  padding = '3%',
  margin = '0',
  position = 'static',
  top,
  bottom,
  left,
  right,
  fontSize,
  textColor = 'black',
  focusBorderColor = 'none',
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

  return (
    <Styled.InputWrapper>
      <Styled.Label htmlFor={forValue} color="#79b0c8" isActive={isFocused || !!value}>
        {labelPlaceHolder}
      </Styled.Label>
      <Styled.AuthenticationInput
        id={forValue}
        isActive={isFocused || !!value}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderColor={placeholderColor}
        type={type}
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
      </Styled.AuthenticationInput>
    </Styled.InputWrapper>
  );
};

export default AuthenticationInput;
