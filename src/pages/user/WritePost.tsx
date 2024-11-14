import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation을 import
import DefaultButton from '../../common/DefaultButton/DefaultButton';
import MainLayout from '@components/MainLayout/MainLayout';

export const Container = styled.div`
  width: 700px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
`;
const FormFieldGroup = styled.div`
  display: flex;
  margin-bottom: 40px;
  gap: 10px;
`;
const Label = styled.label`
  width: 120px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(179, 213, 235, 0.2);
`;
const SelectCategory = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(179, 213, 235, 0.2);
`;
const TextareaField = styled.textarea`
  width: 100%;
  height: 500px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(179, 213, 235, 0.2);
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CategoryOptions = ["선택", "등업", "취업정보", "스터디"];

const WritePost = () => {
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
    <>
      <MainLayout>
        <Container>
          <div>
            <FormFieldGroup>
              <div style={{ flex: 3, display: 'flex' }}>
                <Label style={{ width: '50px' }}>제목</Label>
                <InputField
                  type="text"
                  placeholder="제목을 입력해 주세요."
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <Label>카테고리</Label>
                <SelectCategory value={category} onChange={handleCategoryChange}>
                  {CategoryOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectCategory>
              </div>
            </FormFieldGroup>
          </div>
          <div>
            <Label style={{ marginBottom: '10px' }}>내용</Label>
            <TextareaField
              placeholder="내용을 입력하세요."
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <ButtonGroup>
            <DefaultButton border='1px solid #79B0CB' textColor='#79B0CB' width='100px' onClick={handleCancle}>취소</DefaultButton>
            <DefaultButton backgroundColor="#79B0CB" border='none' textColor='white' width='100px' onClick={handleSubmit}>작성 완료</DefaultButton>
          </ButtonGroup>
        </Container>
      </MainLayout>
    </>
  );
};

export default WritePost;
