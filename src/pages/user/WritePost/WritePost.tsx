import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './WritePost.styled';
import Button from '@components/Button/Button';
import { NavbarContainer } from 'components';
import { BOARD_API } from '@routes/apiRoutes';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';
const { CUD_BOARD, DETAILS_BOARD } = BOARD_API;

const WritePost = () => {
  const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
  // userStore에서 로그인 사용자 정보 가져오기
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const userLevelName = user?.level.name;
  const { state } = useLocation();
  const isEdit = !!state; //state 존재하면 수정모드, 없으면 작성모드
  const [category, setCategory] = useState(state?.category || '선택');
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');

  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);

  const [categoryOptions, setCategoryOptions] = useState<string[]>(['선택']);
  const postId = state?.postId;
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.level.name === '삐약이') {
      setCategoryOptions(['선택', '등업']);
    } else if (user?.level.name === '꼬꼬닭') {
      setCategoryOptions(['선택', '등업', '취업정보', '스터디']);
    }
  }, [user?.level.name]);

  useEffect(() => {
    if (title.length > 0 && content.length > 0 && category != '선택') {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
  }, [title, content, category]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 글 수정/생성 공통 작업
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      title,
      content,
      category: category,
      user: userId,
      board_id: postId,
    };

    try {
      const response = await apiUtils({
        url: CUD_BOARD,
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
    }
    navigate(MAIN_PAGE_URL);
  };
  return (
    <NavbarContainer>
      <Styled.Container>
        <Styled.Label>제목</Styled.Label>
        <Styled.InputField
          type="text"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <Styled.Label>카테고리</Styled.Label>
        <Styled.SelectCategory value={category} onChange={handleCategoryChange}>
          {categoryOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Styled.SelectCategory>
        {userLevelName === '삐약이' && (
          <Styled.WarningText>
            다른 카테고리 글을 작성하려면, 먼저 등업 글을 작성해 주세요.
          </Styled.WarningText>
        )}
        <div>
          <Styled.Label style={{ marginBottom: '10px' }}>내용</Styled.Label>
          <Styled.TextareaField
            placeholder="내용을 입력하세요."
            value={content}
            onChange={handleContentChange}
          />
        </div>

        <Styled.ButtonGroup>
          <Button
            border="1px solid #79B0CB"
            useHover={true}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#fdfdfd"
            textColor="#79B0CB"
            width="10%"
            onClick={() => navigate(MAIN_PAGE_URL)}>
            취소
          </Button>
          <Button
            disabled={inputFieldChecked}
            useHover={!inputFieldChecked}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#3F82AC"
            backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
            border="none"
            textColor="white"
            width="10%"
            type='button'
            onClick={handleSubmit}>
            완료
          </Button>
        </Styled.ButtonGroup>
      </Styled.Container>
    </NavbarContainer>
  );
};

export default WritePost;
