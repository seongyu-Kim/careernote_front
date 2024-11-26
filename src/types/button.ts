import React, { ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fontSize?: string;
  textColor?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  padding?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  useTransition?: boolean;
  useHover?: boolean;
  hoverBackgroundColor?: string;
  transitionDuration?: number;
  hoverScale?: number;
}
