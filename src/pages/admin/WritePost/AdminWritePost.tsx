import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from '@pages/user/WritePost/WritePost.styled'
import Button from '@components/Button/Button';
import { NavbarContainer } from 'components';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { NOTICE_API } from '@routes/apiRoutes';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
const { CREATE_NOTICE } = NOTICE_API;
const AdminWritePost = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const { state } = useLocation(); // PostCard로 부터 state 값 전달 받기
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleCancle = () => {
    navigate('/admin'); // 관리자는 /admin으로 이동
  };
  const handleSubmit = async () => {
    const data = {
      title,
      content,
      user: userId,
    };

    try {
      const response = await apiUtils({
        url: CREATE_NOTICE,
        method: 'POST',
        data: data,
      });
      if (response.status === 200) {
        SuccessToast('게시물이 저장되었습니다.');
        console.log('서버 응답 데이터:', response);
      }
    } catch (error) {
      console.error('공지 등록 요청 실패:', error);
      ErrorToast('공지를 다시 등록하세요.');
    }
    navigate('/admin');
  };
  return (
    <NavbarContainer>
      <Styled.Container>
        <Styled.AdminNotice>공지</Styled.AdminNotice>
        <Styled.FormFieldGroup>
          <Styled.Label>제목</Styled.Label>
          <Styled.InputField
            type="text"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={handleTitleChange}
          />
        </Styled.FormFieldGroup>
        <Styled.Label>내용</Styled.Label>
        <Styled.TextareaField
          placeholder="내용을 입력하세요."
          value={content}
          onChange={handleContentChange}
        />
        <Styled.ButtonGroup>
          <Button border="1px solid #79B0CB" textColor="#79B0CB" width="10%" onClick={handleCancle}>
            취소
          </Button>
          <Button
            backgroundColor="#79B0CB"
            border="none"
            textColor="white"
            width="10%"
            onClick={handleSubmit}>
            완료
          </Button>
        </Styled.ButtonGroup>
      </Styled.Container>
    </NavbarContainer>
  );
};

export default AdminWritePost;
