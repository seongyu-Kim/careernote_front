import React, { useState } from 'react';
import * as Styled from './MyPostList.styled';

interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
  width?: string; // width prop 추가
  isAdmin?: boolean; // 관리자페이지일 경우 목록에 삭제버튼 추가하기 위함
  onDelete?: (id: number) => void;
}

const MyPostList: React.FC<PostListProps> = ({ posts, width = '75rem', isAdmin, onDelete }) => {
  return (
    <>
      <Styled.PostListContainer width={width}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', padding: '10px', color: '#79B0CB' }}>
          📝 내가 쓴 게시글
        </div>
        <Styled.PostHeader>
          <Styled.Category>카테고리</Styled.Category>
          <Styled.Title noPointer>제목</Styled.Title>
          <Styled.Author>작성자</Styled.Author>
          <Styled.Date>작성일</Styled.Date>
          {/* 관리자일 경우만 삭제 버튼 보이기 */}
          {isAdmin && <Styled.Delete>관리</Styled.Delete>}
        </Styled.PostHeader>
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Styled.PostItem key={post.id}>
                <Styled.Category>{post.category}</Styled.Category>
                <Styled.Title>{post.title}</Styled.Title>
                <Styled.Author>{post.author}</Styled.Author>
                <Styled.Date>{post.date}</Styled.Date>
                {isAdmin && onDelete && (
                  <Styled.DeleteBtn onClick={() => onDelete(post.id)}>삭제</Styled.DeleteBtn>
                )}
              </Styled.PostItem>
            ))}
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>작성된 글이 없습니다.</div>
        )}
      </Styled.PostListContainer>
    </>
  );
};

export default MyPostList;
