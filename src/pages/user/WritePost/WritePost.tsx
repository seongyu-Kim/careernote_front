import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './WritePost.styled';
import Button from '@components/Button/Button';
import { NavbarContainer } from 'components';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
const { CREATE_BOARD } = BOARD_API;
const CategoryOptions = ['선택', '등업', '취업정보', '스터디'];

const WritePost = () => {
  // userStore에서 로그인 사용자 정보 가져오기
  const user = useUserStore((state) => state.user);
  const level = user?.level.name;
  const userId = user?.user_id;
  const { state } = useLocation(); // PostCard로 부터 state 값 전달 받기
  const [category, setCategory] = useState(state?.category || '선택');
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');

  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleCancle = () => {
    navigate('/posts'); // 관리자가 아니면 /posts로 이동
  };
  const handleSubmit = async () => {
    const data = {
      title,
      content,
      category: category, // level이 "관리자"인 경우 category를 "공지"로 설정
      user: userId,
    };

    try {
      const response = await apiUtils({
        url: CREATE_BOARD,
        method: 'POST',
        data: data,
      });
      if (response.status === 201) {
        SuccessToast('게시물이 저장되었습니다.');
        console.log('서버 응답 데이터:', response);
      }
    } catch (error) {
      console.error('게시글 등록 혹은 수정 요청 실패:', error);
      ErrorToast('게시물을 다시 등록하세요.');
    }
    navigate('/posts');
  };
  return (
    <NavbarContainer>
      <Styled.Container>

        <Styled.FormFieldGroup>
          <div style={{ flex: 3, display: 'flex' }}>
            <Styled.Label>제목</Styled.Label>
            <Styled.InputField
              type="text"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={handleTitleChange}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <>
              <Styled.Label>카테고리</Styled.Label>
              <Styled.SelectCategory value={category} onChange={handleCategoryChange}>
                {CategoryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Styled.SelectCategory>
            </>
          </div>
        </Styled.FormFieldGroup>
        <div>
          <Styled.Label style={{ marginBottom: '10px' }}>내용</Styled.Label>
          <Styled.TextareaField
            placeholder="내용을 입력하세요."
            value={content}
            onChange={handleContentChange}
          />
        </div>

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

export default WritePost;
