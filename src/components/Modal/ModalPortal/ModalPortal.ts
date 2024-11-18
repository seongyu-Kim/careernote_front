import ReactDom from 'react-dom';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
}

export const ModalPortal = ({ children }: ModalProps) => {
  const element = document.getElementById('modal');
  if (!element) return null;
  return ReactDom.createPortal(children, element);
};
