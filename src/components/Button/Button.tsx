import * as Styled from './Button.styled';
import React, { ReactNode } from 'react';

interface DefaultButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  disabled?: boolean;
  fontSize?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children, //버튼 텍스트
  onClick, //onclick
  textColor = 'black', // 글자 색상
  backgroundColor = 'none', // 배경 색상
  border = '1px solid black', // 테두리
  borderRadius = '8px', //라운드 처리
  width = 'auto', //넓이
  height = 'auto', // 높이
  padding = '5px',
  position = 'static',
  top, // position 사용시 설정
  bottom, // position 사용시 설정
  left, // position 사용시 설정
  right, // position 사용시 설정
  useTransition = false, //트렌지션 사용 여부
  useHover = false, // hover 사용 여부
  hoverBackgroundColor, // hover 상태일 때 버튼 배경 색상
  transitionDuration = 1, // 트랜지션 지속 효과
  hoverScale = 1, // hover Scale 값
  disabled = false, // 버튼 비활성화
  fontSize = '16px',
  type = 'button',
}: DefaultButtonProps) => {
  return (
    <Styled.DefaultButton
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      padding={padding}
      position={position}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      useTransition={useTransition}
      useHover={useHover}
      hoverBackgroundColor={hoverBackgroundColor}
      transitionDuration={transitionDuration}
      hoverScale={hoverScale}
      disabled={disabled}
      fontSize={fontSize}
      type={type}>
      {children}
    </Styled.DefaultButton>
  );
};

export default Button;
