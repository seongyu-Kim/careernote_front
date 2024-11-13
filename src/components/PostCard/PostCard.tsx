import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './PostCard.styles';

interface PostCardProps {
  category: string;
  title: string;
  writer: string;
  date: string;
  content: string;
  user: string;
}

const PostCard: React.FC<PostCardProps> = ({
  category,
  title,
  writer,
  date,
  content,
  user
}) => {
  const navigate = useNavigate();  // navigate 함수 사용

  // 수정 버튼 클릭 시 호출되는 함수
  const handleEdit = () => {
    // 수정할 글의 데이터를 state로 전달하여 /write 페이지로 이동
    navigate('/write', {
      state: {
        category,
        title,
        writer,
        date,
        content,
      },
    });
  };
  return (
    <Styled.Container>
      <Styled.Category>{category}</Styled.Category>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Writer>{writer}</Styled.Writer>
      <Styled.Date>{date}</Styled.Date>
      <Styled.Content>{content}</Styled.Content>
      {/* 수정, 삭제 버튼은 작성자와 로그인한 사용자가 일치하는 경우에만 보임 */}
      {writer === user && (
        <Styled.ButtonGroup>
          <Styled.Button color="#79B0CB" onClick={handleEdit}>수정</Styled.Button>
          <Styled.Button color="#AB5A5A">삭제</Styled.Button>
        </Styled.ButtonGroup>
      )}
    </Styled.Container>
  );
};

export default PostCard;
