import React, { useState, useEffect } from 'react';
import * as Styled from './PostList.styled';
import { useNavigate } from 'react-router-dom';
import { LuPencilLine } from 'react-icons/lu';
import { useUserStore } from '@stores/userStore';
import { SuccessToast } from '@utils/ToastUtils';

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
  onDelete?: (id: number, category: string) => void;
}

const PostList = ({
  columns,
  posts,
  width = '75rem',
  isAdmin,
  isMyPost,
  onDelete,
}: PostListProps) => {
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const { isLogin } = useUserStore();

  // 공지 숨기기
  useEffect(() => {
    setFilteredPosts(
      isChecked ? posts.filter((post) => post.category && post.category !== '') : posts,
    );
  }, [isChecked, posts]);

  //날짜 포멧팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  //체크박스
  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };
  //상세보기
  const handlePostClick = (id: number) => {
    if (!isLogin) {
      SuccessToast('로그인을 먼저 진행해 주세요');
      return;
    }
    navigate(`/posts/${id}`);
  };
  //관리자 상세보기
  const handleAdminPostClick = (id: number) => {
    if (!isLogin) {
      SuccessToast('로그인을 먼저 진행해 주세요');
      return;
    }
    navigate(`/admin/posts/${id}`);
  };
  //글쓰기
  const handleWriteClick = () => {
    if (!isLogin) {
      SuccessToast('로그인을 먼저 진행해 주세요');
      return;
    }
    navigate('/write');
  };

  return (
    <Styled.PostListContainer width={width}>
      {!isMyPost ? (
        <Styled.ButtonBox>
          {isAdmin ? (
            <Styled.WriteButton onClick={() => navigate('/admin-write')}>
              <LuPencilLine />
              공지 쓰기
            </Styled.WriteButton>
          ) : (
            <>
              <Styled.WriteButton onClick={handleWriteClick}>
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

      {filteredPosts.length > 0 ? (
        filteredPosts.map((item) => (
          <Styled.PostItem key={item._id} $isNotice={item.category == null}>
            {columns.map((column) => {
              let value = item[column.key];

              // 탈퇴, user가 없는 사용자
              if (column.key === 'user') {
                value = value ? value.nickname : '알 수 없는 사용자';
              }

              // category 필드가 없는
              if (column.key === 'category') {
                value = value || '공지';
              }

              // 'createdAt' 날짜 포맷팅
              if (column.key === 'createdAt' && value) {
                value = formatDate(value);
              }

              ////
              return (
                <Styled.TableCell
                  key={column.key}
                  $isTitle={column.key === 'title'}
                  onClick={
                    column.key === 'title'
                      ? () => (isAdmin ? handleAdminPostClick(item._id) : handlePostClick(item._id))
                      : undefined
                  }
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
                <Styled.DeleteBtn onClick={() => onDelete(item._id, item.category)}>
                  삭제
                </Styled.DeleteBtn>
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
