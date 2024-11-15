import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from '@components/WritePost/WritePost.styled';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import MainLayout from '@components/MainLayout/MainLayout';
type UserLevel = '관리자' | '삐약이' | '꼬꼬닭';
const CategoryOptions = ['선택', '등업', '취업정보', '스터디'];

const WritePost = () => {
  const [level, setLevel] = useState<UserLevel>('관리자'); // 스토어에서 사용자 등급 받아오기
  const { state } = useLocation(); // useLocation 훅을 사용하여 state 값 받기
  const [category, setCategory] = useState(state?.category || '');
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
    if (level === '관리자') {
      navigate('/admin'); // 관리자는 /admin으로 이동
    } else {
      navigate('/posts'); // 관리자가 아니면 /posts로 이동
    }
  };
  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('카테고리:', category);
  };
  return (
    <MainLayout>
      <Styled.Container>
        {/* 관리자일 경우 "공지"를 상단에 표시 */}
        {level === '관리자' && <Styled.AdminNotice>공지</Styled.AdminNotice>}
        <div>
          <Styled.FormFieldGroup>
            <div style={{ flex: 3, display: 'flex' }}>
              <Styled.Label style={{ width: '50px' }}>제목</Styled.Label>
              <Styled.InputField
                type="text"
                placeholder="제목을 입력해 주세요."
                value={title}
                onChange={handleTitleChange}
                style={{ width: level === '관리자' ? '610px' : '100%' }} // 관리자일 경우 넓은 너비 적용
              />
            </div>
            <div style={{ flex: 1, display: 'flex' }}>
              {level === '관리자' ? (
                <></>
              ) : (
                // 관리자 아닌 경우 선택 가능한 카테고리 셀렉트박스
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
              )}
            </div>
          </Styled.FormFieldGroup>
        </div>

        <div>
          <Styled.Label style={{ marginBottom: '10px' }}>내용</Styled.Label>
          <Styled.TextareaField
            placeholder="내용을 입력하세요."
            value={content}
            onChange={handleContentChange}
          />
        </div>

        <Styled.ButtonGroup>
          <DefaultButton
            border="1px solid #79B0CB"
            textColor="#79B0CB"
            width="10%"
            onClick={handleCancle}>
            취소
          </DefaultButton>
          <DefaultButton
            backgroundColor="#79B0CB"
            border="none"
            textColor="white"
            width="10%"
            onClick={handleSubmit}>
            완료
          </DefaultButton>
        </Styled.ButtonGroup>
      </Styled.Container>
    </MainLayout>
  );
};

export default WritePost;
