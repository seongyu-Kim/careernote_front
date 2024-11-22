// import React, { useEffect, useState } from 'react';
// import { usePostStore } from 'stores/usePostStore';
// import { useLocation } from 'react-router-dom';
// import { NavbarContainer, PostList, Pagination } from 'components';
// import Banner from '@assets/Banner.png';
// import * as Styled from './Main.styled';

// const Main = () => {
//   const location = useLocation();
//   const isMyPost = location.pathname === '/mypage';
//   //usePostStore
//   const { filteredPosts, fetchAllPosts, selectedCategory, totalPostCount } = usePostStore();

//   const savedPage = sessionStorage.getItem('currentPage');
//   // const [currentPage, setCurrentPage] = useState<number>(savedPage ? parseInt(savedPage, 10) : 1);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const postsPerPage = 20;
//   const totalPages = Math.ceil(totalPostCount / postsPerPage);

//   const handlePageChange = async (page: number) => {
//     setCurrentPage(page);
//     // sessionStorage.setItem('currentPage', page.toString());
//     await fetchAllPosts(page, postsPerPage);
//   };

//   // 테이블 컬럼
//   const columns = [
//     { key: 'category', label: '카테고리', flex: '1' },
//     { key: 'title', label: '제목', flex: '3' },
//     { key: 'user', label: '작성자', flex: '1' },
//     { key: 'createdAt', label: '작성일', flex: '1' },
//   ];

//   // 초기 데이터 로드
//   useEffect(() => {
//     fetchAllPosts(currentPage, postsPerPage);
//   }, [selectedCategory, currentPage, fetchAllPosts]);

//   return (
//     <NavbarContainer>
//       <Styled.LogoImg src={Banner} alt="Landing" />
//       <PostList isMyPost={isMyPost} posts={filteredPosts} columns={columns} />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </NavbarContainer>
//   );
// };

// export default Main;
import React, { useEffect, useState } from 'react';
import { usePostStore } from 'stores/usePostStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarContainer, PostList, Pagination } from 'components';
import Banner from '@assets/Banner.png';
import * as Styled from './Main.styled';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMyPost = location.pathname === '/mypage';

  // usePostStore
  const { filteredPosts, fetchAllPosts, selectedCategory, totalPostCount } = usePostStore();

  //페이지 번호
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1');

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const postsPerPage = 20;
  const totalPages = Math.ceil(totalPostCount / postsPerPage);

  //
  useEffect(() => {
    fetchAllPosts(currentPage, postsPerPage);
  }, [selectedCategory, currentPage, fetchAllPosts]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    await fetchAllPosts(page, postsPerPage);
  };

  // 테이블 컬럼
  const columns = [
    { key: 'category', label: '카테고리', flex: '1' },
    { key: 'title', label: '제목', flex: '3' },
    { key: 'user', label: '작성자', flex: '1' },
    { key: 'createdAt', label: '작성일', flex: '1' },
  ];

  return (
    <NavbarContainer>
      <Styled.LogoImg src={Banner} alt="Landing" />
      <PostList isMyPost={isMyPost} posts={filteredPosts} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </NavbarContainer>
  );
};

export default Main;
