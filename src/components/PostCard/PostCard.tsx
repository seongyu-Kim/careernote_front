import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './PostCard.styles';
import Alert from '@components/common/Alert/Alert';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';

interface PostCardProps {
  // post 관련
  category: string;
  title: string;
  writer: string;
  date: string;
  content: string;
  user: string; // writer랑 일치하면 수정,삭제 가능
  level?: string; // 관리자이면 모든 글 수정, 삭제 가능
  // 모달 관련
  isOpen: boolean;
  message: string; // 모달에 표시할 메시지
  openModal: (message: string) => void;
  closeModal: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  category,
  title,
  writer,
  date,
  content,
  user,
  level,
  isOpen,
  message,
  openModal,
  closeModal,
}) => {
  const navigate = useNavigate();
  // 삭제 여부 : "네" 버튼 클릭 시 호출되는 함수
  const handleDelete = () => {
    console.log('게시글이 삭제되었습니다.');
    //삭제 api 호출 부분 추가 예정
    closeModal();
  };

  // 삭제 여부 : "아니요" 버튼 클릭 시 호출되는 함수
  const handleCancel = () => {
    console.log('모달 닫기', isOpen);
    closeModal();
  };

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

      {/* 관리자가 작성한 글인 경우 또는 사용자=작성자 일치하는 경우 수정, 삭제 버튼 모두 보이기 */}
      {(writer === user || level === '관리자') && (
        <Styled.ButtonGroup>
          {(level === '관리자' && writer === user) || writer === user ? (
            <>
              <DefaultButton
                backgroundColor="#79B0CB"
                border="none"
                textColor="white"
                width="10%"
                onClick={handleEdit}>
                수정
              </DefaultButton>
              <DefaultButton
                backgroundColor="#E25151"
                border="none"
                textColor="white"
                width="10%"
                onClick={() => openModal('삭제하시겠습니까?')}>
                삭제
              </DefaultButton>
            </>
          ) : (
            // 다른 사용자의 글에서는 삭제 버튼만 보이게 하기
            <DefaultButton
              backgroundColor="#E25151"
              border="none"
              textColor="white"
              width="10%"
              onClick={() => openModal('삭제하시겠습니까?')}>
              삭제
            </DefaultButton>
          )}
        </Styled.ButtonGroup>
      )}

      {/* 모달 컴포넌트 사용 */}
      <Alert isOpen={isOpen} message={message} onConfirm={handleDelete} onCancel={handleCancel} />
    </Styled.Container>
  );
};

export default PostCard;
