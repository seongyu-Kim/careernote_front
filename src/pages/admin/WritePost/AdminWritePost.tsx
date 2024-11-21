import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from '@pages/user/WritePost/WritePost.styled'
import Button from '@components/Button/Button';
import { NavbarContainer } from 'components';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { NOTICE_API } from '@routes/apiRoutes';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';
const { CUD_NOTICE } = NOTICE_API;
const AdminWritePost = () => {
  const ADMIN_MAIN = ROUTE_LINK.ADMIN_MAIN.link;
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const userLevelId = user?.level._id;
  const { state } = useLocation(); // PostCard로 부터 state 값 전달 받기
  const postId = state?.postId;
  // state가 존재하는지 확인
  const isEdit = !!state;
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

  // 글 수정/생성 공통 작업 
  const handleSubmit = async () => {
    // 공통 데이터
    let data: any;
    if (isEdit) {
      // 수정 요청 시 데이터 구조
      data = {
        notice_id: postId, // 수정할 공지 ID
        title,
        content,
        user: userId,
      };
    } else {
      // 생성 요청 시 데이터 구조
      data = {
        title,
        content,
        user: userId, // 사용자 ID
      };
    }

    try {
      const response = await apiUtils({
        url: CUD_NOTICE,
        method: isEdit ? 'PUT' : 'POST',
        data: data,
      });

      if (isEdit) {
        SuccessToast('게시물이 수정되었습니다.');
      } else {
        SuccessToast('게시물이 저장되었습니다.');
      }
      console.log('서버 응답 데이터:', response);
    } catch (error) {
      console.error('게시글 등록 혹은 수정 요청 실패:', error);
      if (isEdit) {
        ErrorToast('게시물 수정 중 오류가 발생했습니다.');
      } else {
        ErrorToast('게시물 등록 중 오류가 발생했습니다.');
      }
    } navigate(ADMIN_MAIN);
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
