import React from 'react';
import { useState, useEffect } from 'react';
import { usePostStore } from 'stores/usePostStore';
import { useLocation } from 'react-router-dom';
import { NavbarContainer, PostList, Pagination } from 'components';
import Banner from '@assets/Banner.png';
import * as Styled from './Main.styled';

const Main = () => {
  const location = useLocation();
  const isMyPost = location.pathname === '/mypage';

  const { filteredPosts, fetchAllPosts, selectedCategory } = usePostStore();

  const savedPage = sessionStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState<number>(savedPage ? parseInt(savedPage, 10) : 1);

  //페이지네이션
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
  };

  //테이블
  const columns = [
    { key: 'category', label: '카테고리', flex: '1' },
    { key: 'title', label: '제목', flex: '3' },
    { key: 'user', label: '작성자', flex: '1' },
    { key: 'createdAt', label: '작성일', flex: '1' },
  ];

  useEffect(() => {
    fetchAllPosts();
  }, [selectedCategory, fetchAllPosts]);

  return (
    <NavbarContainer>
      <Styled.LogoImg src={Banner} alt="Landing" />
      <PostList isMyPost={isMyPost} posts={currentPosts} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </NavbarContainer>
  );
};

export default Main;
