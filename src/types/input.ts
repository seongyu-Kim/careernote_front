import React, { ReactNode } from 'react';

export interface InputProps {
  forValue?: string;
  children?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  labelPlaceHolder?: string; //추가
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
  isActive?: boolean;
}
