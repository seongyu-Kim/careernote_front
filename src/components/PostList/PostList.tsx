import React, { useState } from 'react';
import * as Styled from './PostList.styled';
import landing from '@assets/landing.png';
import { LuPencilLine } from 'react-icons/lu';

interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
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
