import React from 'react';
import { useState, useEffect } from 'react';
import useCategoryStore from '@stores/useCategoryStore';
import { useLocation } from 'react-router-dom';
import { NavbarContainer, PostList, Pagination } from 'components';
import Banner from '@assets/Banner.png';
import * as Styled from './Main.styled';
import apiUtils from '@utils/apiUtils';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';

const { ALL_NOTICES } = NOTICE_API;
const { ALL_BOARD } = BOARD_API;

// const dummyPosts: Post[] = [];

// const dummyPosts: Post[] = [
//   {
//     _id: 1,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 2,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 3,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 4,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 5,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 6,
//     category: '자유게시판',
//     title: '여섯',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 7,
//     category: '공지',
//     title: '일곱',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 8,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 9,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 10,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 11,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 12,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 13,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 14,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 15,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 16,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 17,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 18,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 19,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 20,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 21,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 22,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 23,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 24,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 25,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 26,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 27,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 28,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 29,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 30,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 31,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 32,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 33,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 34,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 35,
//     category: '자유게시판',
//     title: '다섯 번째 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 36,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 37,
//     category: '등업',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 38,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 39,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 40,
//     category: '자유게시판',
//     title: '끝!!!!!!!! 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
//   {
//     _id: 41,
//     category: '자유게시판',
//     title: '첫 번째 게시글',
//     user: '김선규',
//     createdAt: '2024-11-13',
//   },
//   {
//     _id: 42,
//     category: '공지',
//     title: '두 번째 게시글',
//     user: '박주호',
//     createdAt: '2024-11-12',
//   },
//   {
//     _id: 43,
//     category: '취업',
//     title: '세 번째 게시글',
//     user: '이주영',
//     createdAt: '2024-11-11',
//   },
//   {
//     _id: 44,
//     category: '스터디',
//     title: '네 번째 게시글',
//     user: '조아라',
//     createdAt: '2024-11-10',
//   },
//   {
//     _id: 45,
//     category: '자유게시판',
//     title: '진짜 마지막 게시글',
//     user: '하정우',
//     createdAt: '2024-11-09',
//   },
// ];

interface Post {
  _id: number;
  title: string;
  category: string;
  user: User;
  createdAt: string;
}
interface User {
  _id: number;
  nickname: string;
  level: string;
}
//공지
// {
//   "_id": "673c81624fb83f29da6d1978",
//   "title": "정우 여섯번째 글",
//   "user": {
//       "_id": "673c4fead43295e68c4525d7",
//       "nickname": "정우관리자",
//       "level": "673bf4d566d0a99161d942c1"
//   },
//   "content": "정우 여섯번째 글내용",
//   "createdAt": "2024-11-19T12:15:30.401Z",
//   "updatedAt": "2024-11-19T12:15:30.401Z",
//   "__v": 0
// },

//게시글
// {
//   "_id": "673c85d3c283a3c822fedfcb",
//   "title": "정우 글 수정하는것1.",
//   "user": {
//       "_id": "673c278248f2b5120fd25db9",
//       "nickname": "빠알간두볼",
//       "level": "673bf4d566d0a99161d942bf"
//   },
//   "content": "글 수정하기 위해서 하는 스터디1",
//   "category": "스터디",
//   "createdAt": "2024-11-19T12:34:27.618Z",
//   "updatedAt": "2024-11-19T12:37:51.298Z",
//   "__v": 0
// },

const Main = () => {
  const location = useLocation();
  const isMyPost = location.pathname === '/mypage';

  const savedPage = sessionStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState<number>(savedPage ? parseInt(savedPage, 10) : 1);
  const [posts, setPosts] = useState<Post[]>([]);
  // const { selectedCategory } = useCategoryStore();
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // const filteredPosts =
  //   selectedCategory === '자유게시판'
  //     ? posts
  //     : posts.filter((post) => post.category === selectedCategory);
  // const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  // const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPosts = (posts || []).slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil((posts || []).length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
  };

  //테이블 데이터
  const columns = [
    { key: 'category', label: '카테고리', flex: '1' },
    { key: 'title', label: '제목', flex: '3' },
    { key: 'user', label: '작성자', flex: '1' },
    { key: 'createdAt', label: '작성일', flex: '1' },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await apiUtils({
          url: ALL_NOTICES,
          method: 'GET',
        });
        console.log('공지:', response);
        return response.Notices;
      } catch (error) {
        console.error('공지 가져오기 실패:', error);
        return [];
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await apiUtils({
          url: ALL_BOARD,
          method: 'GET',
        });
        console.log('게시글:', response);
        return response.boards;
      } catch (error) {
        console.error('게시글 가져오기 실패:', error);
        return [];
      }
    };

    const fetchAll = async () => {
      const [notices, posts] = await Promise.all([fetchNotices(), fetchPosts()]);

      setPosts([...notices, ...posts]);
    };

    fetchAll();
  }, []);

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
