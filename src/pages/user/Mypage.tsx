import React from 'react';
import MainLayout from '@components/MainLayout/MainLayout';
import landing from '@assets/landing.png';
import * as Styled from '../../components/PostList/PostList.styled';
import Pagination from '@components/Pagination/Pagination';
import { useState } from 'react';
import PostList from '@components/PostList/PostList';

const dummyPosts = [
  {
    id: 1,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 2,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 3,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 4,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 5,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 6,
    category: '자유게시판',
    title: '여섯',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 7,
    category: '공지',
    title: '일곱',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 8,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 9,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 10,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 11,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 12,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 13,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 14,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 15,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 16,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 17,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 18,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 19,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 20,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 21,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 22,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 23,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 24,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 25,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 26,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 27,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 28,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 29,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 30,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 31,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 32,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 33,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 34,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 35,
    category: '자유게시판',
    title: '다섯 번째 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 36,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 37,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 38,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 39,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 40,
    category: '자유게시판',
    title: '끝!!!!!!!! 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
  {
    id: 41,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 42,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 43,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
  {
    id: 44,
    category: '스터디',
    title: '네 번째 게시글',
    author: '조아라',
    date: '2024-11-10',
  },
  {
    id: 45,
    category: '자유게시판',
    title: '진짜 마지막 게시글',
    author: '하정우',
    date: '2024-11-09',
  },
];

const Mypage: React.FC = () => {
  const savedPage = sessionStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState<number>(savedPage ? parseInt(savedPage, 10) : 1);
  const [posts, setPosts] = useState(dummyPosts);

  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
  };

  return (
    <MainLayout>
      <Styled.LogoImg src={landing} alt="Landing" />
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </MainLayout>
  );
};

export default Mypage;
