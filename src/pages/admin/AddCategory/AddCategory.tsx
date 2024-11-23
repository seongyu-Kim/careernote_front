import { useModal } from '@stores/store';
import * as Styled from '@styles/Authentication/Authentication.styled';
import { MdClose } from 'react-icons/md';
import { AuthenticationInput, Button } from '@components/index';
import React, { ChangeEvent, useState } from 'react';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import apiUtils from '@utils/apiUtils';
import { ADMIN_API } from '@routes/apiRoutes';
import { MyInfoDivider } from '@styles/Authentication/Authentication.styled';

const AddCategory = () => {
  const [inputCategory, setInputCategory] = useState('');
  const { isOpen, setIsOpen, setModalState } = useModal();
  const { CREATE_CATEGORY } = ADMIN_API;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCategory(event.target.value);
  };

  const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputCategory) {
      ErrorToast('입력 필드가 비어있습니다');
      return;
    }
    try {
      const res = await apiUtils({
        url: CREATE_CATEGORY,
        method: 'POST',
        data: {
          name: inputCategory,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.message === '카테고리가 생성되었습니다') {
        SuccessToast('카테고리 생성 성공');
      }
    } catch (error) {
      ErrorToast('카테고리 생성 실패');
      console.error(error);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <Styled.ModalBackground>
      <Styled.ModalContainer>
        <MdClose
          className="close"
          onClick={() => {
            setIsOpen(false);
            setModalState('');
          }}
        />
        <Styled.ModalField>
          <Styled.MyInfoDivider />
          <Styled.Text fontSize="2.5rem">카테고리 추가하기</Styled.Text>
          <Styled.TextContainer>
            <Styled.Text fontSize="1.2rem">추가 할 카테고리를 입력해주세요.</Styled.Text>
          </Styled.TextContainer>
          <Styled.Form onSubmit={handleAddCategory}>
            <Styled.InputBoxContainer>
              <AuthenticationInput
                forValue="addCategory"
                labelPlaceHolder="카테고리명"
                onChange={handleInputChange}
              />
              <Styled.MyInfoDivider />
              <Styled.MyInfoDivider />
              <Styled.PasswordButtonContainer>
                <Styled.MyInfoDivider />
                <Styled.MyInfoDivider />
                <Button
                  type="submit"
                  border="none"
                  textColor="white"
                  backgroundColor="#79B0CB"
                  useHover={true}
                  hoverBackgroundColor="#3F82AC"
                  useTransition={true}
                  transitionDuration={0.2}>
                  추가하기
                </Button>
                <Styled.MyInfoDivider />
                <Button
                  onClick={() => {}}
                  border="none"
                  textColor="white"
                  backgroundColor="#AB5A5A"
                  useHover={true}
                  hoverBackgroundColor="#A14242"
                  useTransition={true}
                  transitionDuration={0.2}>
                  닫기
                </Button>
              </Styled.PasswordButtonContainer>
            </Styled.InputBoxContainer>
          </Styled.Form>
        </Styled.ModalField>
      </Styled.ModalContainer>
    </Styled.ModalBackground>
  );
};

export default AddCategory;
