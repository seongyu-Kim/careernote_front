import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './PostCard.styles';
import Button from '@components/Button/Button';
import { useAlertStore } from '@stores/store';

interface PostCardProps {
  // post 관련
  post: {
    id: string;
    category: string;
    title: string;
    writer: string;
    date: string;
    content: string;
  };
  user?: string; // writer랑 일치하면 수정,삭제 가능
  level?: string; // 관리자이면 모든 글 수정, 삭제 가능
  onDelete: (postId: string) => void;
}

const PostCard = ({ post, user, level, onDelete }: PostCardProps) => {
  const { openAlert } = useAlertStore();
  const navigate = useNavigate();

  const handleEdit = () => {
    // 수정할 글의 데이터를 state로 전달하여 /write 페이지로 이동
    navigate('/write', {
      state: {
        category: post.category,
        title: post.title,
        writer: post.writer,
        date: post.date,
        content: post.content,
      },
    });
  };

  return (
    <Styled.Container>
      <Styled.Category>{post.category}</Styled.Category>
      <Styled.Title>{post.title}</Styled.Title>
      <Styled.Writer>{post.writer}</Styled.Writer>
      <Styled.Date>{post.date}</Styled.Date>
      <Styled.Content>{post.content}</Styled.Content>

      {/* 관리자가 작성한 글인 경우 또는 사용자=작성자 일치하는 경우 수정, 삭제 버튼 모두 보이기 */}
      {(post.writer === user || level === '관리자') && (
        <Styled.ButtonGroup>
          {(level === '관리자' && post.writer === user) || post.writer === user ? (
            <>
              <Button
                backgroundColor="#79B0CB"
                border="none"
                textColor="white"
                width="10%"
                onClick={handleEdit}>
                수정
              </Button>
              <Button
                backgroundColor="#E25151"
                border="none"
                textColor="white"
                width="10%"
                onClick={() => openAlert('삭제하시겠습니까?', () => onDelete(post.id))}>
                삭제
              </Button>
            </>
          ) : (
            // 다른 사용자의 글에서는 삭제 버튼만 보이게 하기
            <Button
              backgroundColor="#E25151"
              border="none"
              textColor="white"
              width="10%"
              onClick={() => openAlert('삭제하시겠습니까?', () => onDelete(post.id))}>
              삭제
            </Button>
          )}
        </Styled.ButtonGroup>
      )}
    </Styled.Container>
  );
};

export default PostCard;
