import React, { useEffect, useState } from 'react';
import { usePostStore } from 'stores/usePostStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarContainer, PostList, Pagination } from 'components';
import { useUserStore } from '@stores/userStore';
import Banner from '@assets/Banner.png';
import * as Styled from './Main.styled';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMyPost = location.pathname === '/mypage';
  const { user } = useUserStore();
  const {
    posts,
    postsByCategory,
    fetchAllPosts,
    fetchNoticePosts,
    fetchPostsByCategory,
    selectedCategory,
    totalPostCount,
    currentPage,
    setCurrentPage,
  } = usePostStore();

  const [isChecked, setChecked] = useState<boolean>(false);
  const postsPerPage = 20;

  const totalPages = isMyPost
    ? Math.ceil((user?.boards?.length || 0) / postsPerPage)
    : Math.ceil(totalPostCount / postsPerPage);

  const rawPosts = isMyPost
    ? (user?.boards || [])
        .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
        .map((board) => ({
          ...board,
          user: user
            ? {
                _id: user.user_id,
                nickname: user.nickName,
                level: String(user.level),
              }
            : {
                _id: '',
                nickname: 'Unknown',
                level: '',
              },
        }))
    : selectedCategory === '공지'
      ? posts
      : selectedCategory && selectedCategory !== '전체게시판'
        ? postsByCategory
        : posts;

  const postsToDisplay = rawPosts.filter((post) =>
    isChecked ? post.category && post.category !== '' : true,
  );

  useEffect(() => {
    if (!isMyPost) {
      if (selectedCategory === '공지') {
        fetchNoticePosts(currentPage, postsPerPage);
      } else if (selectedCategory && selectedCategory !== '전체게시판') {
        fetchPostsByCategory(currentPage, postsPerPage);
      } else {
        fetchAllPosts(currentPage, postsPerPage);
      }
    }
  }, [isMyPost, selectedCategory, currentPage]);

  const handlePageChange = async (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      navigate(`?page=${page}`);
      if (selectedCategory === '공지') {
        await fetchNoticePosts(page, postsPerPage);
      } else if (selectedCategory && selectedCategory !== '전체게시판') {
        await fetchPostsByCategory(page, postsPerPage);
      } else {
        await fetchAllPosts(page, postsPerPage);
      }
    }
  };

  const columns = [
    { key: 'category', label: '카테고리', flex: '1' },
    { key: 'title', label: '제목', flex: '3' },
    { key: 'user', label: '작성자', flex: '1' },
    { key: 'createdAt', label: '작성일', flex: '1' },
  ];

  return (
    <NavbarContainer>
      <Styled.LogoImg src={Banner} alt="Landing" />
      <PostList
        isMyPost={isMyPost}
        posts={postsToDisplay}
        columns={columns}
        isChecked={isChecked}
        setChecked={setChecked}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </NavbarContainer>
  );
};

export default Main;
