import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from '@components/WritePostPage/WritePostPage.styled';
import DefaultButton from '@common/DefaultButton/DefaultButton';

const CategoryOptions = ["선택", "등업", "취업정보", "스터디"];
const WritePostPage = () => {
  const { state } = useLocation(); // useLocation 훅을 사용하여 state 값 받기
  const [category, setCategory] = useState(state?.category || "");
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
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
    navigate('/posts');
  };
  const handleSubmit = () => {
    console.log("제목:", title);
    console.log("내용:", content);
    console.log("카테고리:", category);
  };
  return (
    <Styled.Container>
      <div>
        <Styled.FormFieldGroup>
          <div style={{ flex: 3, display: 'flex' }}>
            <Styled.Label style={{ width: '50px' }}>제목</Styled.Label>
            <Styled.InputField
              type="text"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <Styled.Label>카테고리</Styled.Label>
            <Styled.SelectCategory value={category} onChange={handleCategoryChange}>
              {CategoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Styled.SelectCategory>
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
        <DefaultButton border='1px solid #79B0CB' textColor='#79B0CB' width='100px' onClick={handleCancle}>취소</DefaultButton>
        <DefaultButton backgroundColor="#79B0CB" border='none' textColor='white' width='100px' onClick={handleSubmit}>작성 완료</DefaultButton>
      </Styled.ButtonGroup>
    </Styled.Container>
  )
}

export default WritePostPage
