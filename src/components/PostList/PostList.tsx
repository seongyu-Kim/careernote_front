import React, { useState } from 'react';
import * as Styled from './PostList.styled';
import landing from '@assets/landing.png';
import { LuPencilLine } from 'react-icons/lu';

const PostList: React.FC = () => {
  const posts = [
    {
      id: 1,
      category: '자유게시판',
      title: '첫 번째 게시글',
      author: '김선규',
      date: '2024-11-13',
      views: 123,
    },
    {
      id: 2,
      category: '공지',
      title: '두 번째 게시글',
      author: '박주호',
      date: '2024-11-12',
      views: 98,
    },
    {
      id: 3,
      category: '취업',
      title: '세 번째 게시글',
      author: '이주영',
      date: '2024-11-11',
      views: 76,
    },
    {
      id: 4,
      category: '스터디',
      title: '네 번째 게시글',
      author: '조아라',
      date: '2024-11-10',
      views: 45,
    },
    {
      id: 5,
      category: '자유게시판',
      title: '다섯 번째 게시글',
      author: '하정우',
      date: '2024-11-09',
      views: 189,
    },
    {
      id: 1,
      category: '자유게시판',
      title: '첫 번째 게시글',
      author: '김선규',
      date: '2024-11-13',
      views: 123,
    },
    {
      id: 2,
      category: '공지',
      title: '두 번째 게시글',
      author: '박주호',
      date: '2024-11-12',
      views: 98,
    },
    {
      id: 3,
      category: '취업',
      title: '세 번째 게시글',
      author: '이주영',
      date: '2024-11-11',
      views: 76,
    },
    {
      id: 4,
      category: '스터디',
      title: '네 번째 게시글',
      author: '조아라',
      date: '2024-11-10',
      views: 45,
    },
    {
      id: 5,
      category: '자유게시판',
      title: '다섯 번째 게시글',
      author: '하정우',
      date: '2024-11-09',
      views: 189,
    },
    {
      id: 1,
      category: '자유게시판',
      title: '첫 번째 게시글',
      author: '김선규',
      date: '2024-11-13',
      views: 123,
    },
    {
      id: 2,
      category: '공지',
      title: '두 번째 게시글',
      author: '박주호',
      date: '2024-11-12',
      views: 98,
    },
    {
      id: 3,
      category: '취업',
      title: '세 번째 게시글',
      author: '이주영',
      date: '2024-11-11',
      views: 76,
    },
    {
      id: 4,
      category: '스터디',
      title: '네 번째 게시글',
      author: '조아라',
      date: '2024-11-10',
      views: 45,
    },
    {
      id: 5,
      category: '자유게시판',
      title: '다섯 번째 게시글',
      author: '하정우',
      date: '2024-11-09',
      views: 189,
    },
    {
      id: 1,
      category: '자유게시판',
      title: '첫 번째 게시글',
      author: '김선규',
      date: '2024-11-13',
      views: 123,
    },
    {
      id: 2,
      category: '공지',
      title: '두 번째 게시글',
      author: '박주호',
      date: '2024-11-12',
      views: 98,
    },
    {
      id: 3,
      category: '취업',
      title: '세 번째 게시글',
      author: '이주영',
      date: '2024-11-11',
      views: 76,
    },
    {
      id: 4,
      category: '스터디',
      title: '네 번째 게시글',
      author: '조아라',
      date: '2024-11-10',
      views: 45,
    },
    {
      id: 5,
      category: '자유게시판',
      title: '다섯 번째 게시글',
      author: '하정우',
      date: '2024-11-09',
      views: 189,
    },
  ];

  const [isChecked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Styled.LogoImg src={landing} alt="Landing" />
      <Styled.PostListContainer>
        <Styled.ButtonBox>
          <Styled.WriteButton>
            <LuPencilLine />
            글쓰기
          </Styled.WriteButton>
          <Styled.CheckboxWrapper>
            <Styled.Checkbox type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <div>공지 숨기기</div>
          </Styled.CheckboxWrapper>
        </Styled.ButtonBox>

        <Styled.PostHeader>
          <Styled.Category>카테고리</Styled.Category>
          <Styled.Title>제목</Styled.Title>
          <Styled.Author>작성자</Styled.Author>
          <Styled.Date>작성일</Styled.Date>
        </Styled.PostHeader>

        {posts.map((post) => (
          <Styled.PostItem key={post.id}>
            <Styled.Category>{post.category}</Styled.Category>
            <Styled.Title>{post.title}</Styled.Title>
            <Styled.Author>{post.author}</Styled.Author>
            <Styled.Date>{post.date}</Styled.Date>
          </Styled.PostItem>
        ))}
      </Styled.PostListContainer>
    </>
  );
};

export default PostList;
