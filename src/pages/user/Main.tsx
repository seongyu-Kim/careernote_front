import React from 'react';
import MainLayout from '@components/MainLayout/MainLayout';
import PostList from '@components/PostList/PostList';
import landing from '@assets/landing.png';

const Main: React.FC = () => {
  return (
    <MainLayout>
      <PostList />
    </MainLayout>
  );
};

export default Main;
