import React, { useState } from 'react';
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
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  [key: string]: any;
}

interface PostListProps {
  columns: Column[];
  posts: Post[];
  width?: string;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  columns,
  posts,
  width = '75rem',
  isAdmin,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Styled.PostListContainer width={width}>
      {/* 테이블 버튼 옵션 */}
      {!isAdmin && (
        <Styled.ButtonBox>
          <Styled.WriteButton onClick={() => navigate('/write')}>
            <LuPencilLine />
            글쓰기
          </Styled.WriteButton>
          <Styled.CheckboxWrapper>
            <Styled.Checkbox type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <div>공지 숨기기</div>
          </Styled.CheckboxWrapper>
        </Styled.ButtonBox>
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
        posts.map((item, index) => (
          <Styled.PostItem key={index}>
            {columns.map((column) => (
              <Styled.TableCell
                key={column.key}
                isTitle={column.key === 'title'}
                onClick={column.key === 'title' ? () => handlePostClick(item.id) : undefined}
                style={{ flex: column.flex }}>
                {column.render ? column.render(item) : item[column.key]}
              </Styled.TableCell>
            ))}
            {isAdmin && onDelete && (
              <Styled.TableCell
                style={{
                  flex: columns.find((column) => column.key === 'admin')?.flex,
                  textAlign: 'center',
                }}>
                <Styled.DeleteBtn onClick={() => onDelete(item.id)}>삭제</Styled.DeleteBtn>
              </Styled.TableCell>
            )}
          </Styled.PostItem>
        ))
      ) : (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>작성된 데이터가 없습니다.</div>
      )}
    </Styled.PostListContainer>
  );
};

export default PostList;
