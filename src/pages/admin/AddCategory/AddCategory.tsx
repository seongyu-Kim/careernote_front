import { useModal } from '@stores/store';
import * as Styled from '@styles/Authentication/Authentication.styled';
import { MdClose } from 'react-icons/md';
import { AuthenticationInput, Button } from '@components/index';
import React, { ChangeEvent, useState } from 'react';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { useCategoryStore } from '@stores/useCategoryStore';

const AddCategory = () => {
  const [inputCategory, setInputCategory] = useState('');
  const { isOpen, setIsOpen, setModalState } = useModal();
  const { addCategory } = useCategoryStore();

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
      await addCategory(inputCategory);
      setIsOpen(false);
    } catch (error) {
      console.error('카테고리 추가 실패:', error);
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
              <Styled.Divider />
              <Styled.Divider />
              <Styled.Divider />
              <Styled.PasswordButtonContainer>
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
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
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
