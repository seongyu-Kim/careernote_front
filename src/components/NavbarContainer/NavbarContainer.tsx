import React, { useEffect, useState } from 'react';
import * as Styled from './NavbarContainer.styled';
import { Navbar } from 'components';
import { useCategoryStore } from '@stores/useCategoryStore';

interface NavbarContainerProps {
  children: React.ReactNode;
}

const NavbarContainer = ({ children }: NavbarContainerProps) => {
  const { categories, fetchCategories } = useCategoryStore();

  const categoryNames = ['전체게시판', ...categories.map((category) => category.name)];

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Styled.MainBox>
      <Navbar categories={categoryNames} />
      <Styled.ContentBox>{children}</Styled.ContentBox>
    </Styled.MainBox>
  );
};

export default NavbarContainer;
