import React, { useState, useEffect } from 'react';
import * as Styled from './PostList.styled';
import { useNavigate } from 'react-router-dom';
import { LuPencilLine } from 'react-icons/lu';

interface Column {
  key: string;
  label: string;
  flex?: string;
  render?: (item: any) => React.ReactNode;
}

interface Post {
  _id: number;
  title: string;
  category: string;
  user: User;
  createdAt: string;
  [key: string]: any;
}
interface User {
  _id: number;
  nickname: string;
  level: string;
}

interface PostListProps {
  columns: Column[];
  posts: Post[];
  width?: string;
  isAdmin?: boolean;
  isMyPost?: boolean;
  onDelete?: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  columns,
  posts,
  width = '75rem',
  isAdmin,
  isMyPost,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState<boolean>(false);
  //공지 필더링
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    setFilteredPosts(isChecked ? posts.filter((post) => post.category !== '공지') : posts);
  }, [isChecked, posts]);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Styled.PostListContainer width={width}>
      {/* 테이블 버튼 옵션 */}
      {!isMyPost ? (
        <Styled.ButtonBox>
          {isAdmin ? (
            <Styled.WriteButton onClick={() => navigate('/admin-write')}>
              <LuPencilLine />
              공지 쓰기
            </Styled.WriteButton>
          ) : (
            <>
              <Styled.WriteButton onClick={() => navigate('/write')}>
                <LuPencilLine />
                글쓰기
              </Styled.WriteButton>
              <Styled.CheckboxWrapper>
                <Styled.Checkbox
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div>공지 숨기기</div>
              </Styled.CheckboxWrapper>
            </>
          )}
        </Styled.ButtonBox>
      ) : (
        <Styled.MyPostText>📝 내가 쓴 글</Styled.MyPostText>
      )}

      {/* 테이블 헤더 */}
      <Styled.PostHeader>
        {columns.map((column) => (
          <Styled.TableCell key={column.key} style={{ flex: column.flex, textAlign: 'center' }}>
            {column.label}
          </Styled.TableCell>
        ))}
        {isAdmin && (
          <Styled.TableCell
            style={{
              flex: columns.find((column) => column.key === 'admin')?.flex,
              textAlign: 'center',
            }}>
            관리
          </Styled.TableCell>
        )}
      </Styled.PostHeader>

      {/* 테이블 데이터 */}
      {posts.length > 0 ? (
        posts.map((item) => (
          <Styled.PostItem key={item.id}>
            {columns.map((column) => {
              let value = item[column.key];
              if (column.key === 'category' && !value) {
                value = '공지';
              } else if (column.key === 'user' && typeof value === 'object') {
                value = value.nickname;
              }

              return (
                <Styled.TableCell
                  key={column.key}
                  $isTitle={column.key === 'title'}
                  onClick={column.key === 'title' ? () => handlePostClick(item._id) : undefined}
                  style={{ flex: column.flex }}>
                  {value}
                </Styled.TableCell>
              );
            })}
            {isAdmin && onDelete && (
              <Styled.TableCell
                style={{
                  flex: columns.find((column) => column.key === 'admin')?.flex,
                  textAlign: 'center',
                }}>
                <Styled.DeleteBtn onClick={() => onDelete(item._id)}>삭제</Styled.DeleteBtn>
              </Styled.TableCell>
            )}
          </Styled.PostItem>
        ))
      ) : (
        <Styled.NoDataText>작성된 데이터가 없습니다.</Styled.NoDataText>
      )}
    </Styled.PostListContainer>
  );
};

export default PostList;
