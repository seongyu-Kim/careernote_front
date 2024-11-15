import React, { useState } from 'react';
import * as Styled from './PostList.styled';
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
  width?: string;  // width prop 추가 
  isAdmin?: boolean; // 관리자페이지일 경우 목록에 삭제버튼 추가하기 위함
  onDelete?: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, width = '75rem', isAdmin, onDelete }) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Styled.PostListContainer width={width}>
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
          {/* 관리자일 경우만 삭제 버튼 보이기 */}
          {isAdmin && <Styled.Delete>관리</Styled.Delete>}
        </Styled.PostHeader>

        {posts.map((post) => (
          <Styled.PostItem key={post.id}>
            <Styled.Category>{post.category}</Styled.Category>
            <Styled.Title>{post.title}</Styled.Title>
            <Styled.Author>{post.author}</Styled.Author>
            <Styled.Date>{post.date}</Styled.Date>
            {isAdmin && onDelete && (
              <Styled.DeleteBtn
                onClick={() => onDelete(post.id)} // onDelete가 정의되어 있을 때만 호출
              >
                삭제
              </Styled.DeleteBtn>
            )} {/* 관리자일 경우만 삭제 버튼 보이기 */}
          </Styled.PostItem>
        ))}
      </Styled.PostListContainer>
    </>
  );
};

export default PostList;
