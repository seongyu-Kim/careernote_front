import styled from 'styled-components';

export interface ButtonProps {
  borderRadius: string;
  textColor: string;
  backgroundColor: string;
  border: string;
  width: string;
  height: string;
  padding: string;
  position: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  useTransition?: boolean;
  useHover?: boolean;
  hoverBackgroundColor?: string;
  hoverScale?: number;
  transitionDuration?: number;
}

export const DefaultButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  cursor: pointer;

  ${(props) =>
    props.useTransition &&
    `
      transition: transform ${props.transitionDuration}s ease,
                  background-color ${props.transitionDuration}s ease;
    `}

  ${(props) =>
    props.useHover &&
    `
      &:hover {
        background-color: ${props.hoverBackgroundColor || '#b3d5eb'};
        transform: scale(${props.hoverScale});
      }
    `}
`;
