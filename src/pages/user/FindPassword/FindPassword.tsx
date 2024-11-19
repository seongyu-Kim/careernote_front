import * as Styled from '@styles/Authentication/Authentication.styled';
import logo from '@assets/icon.png';
import Button from '@components/Button/Button';
import { MdClose } from 'react-icons/md';
import { useModal } from '@stores/store';
import React, { useEffect, useState } from 'react';
import { USER_API } from '@routes/apiRoutes';
import InputChecker from '@components/InputChecker/InputChecker';
import apiUtils from '@utils/apiUtils';

export const FindPassword = () => {
  const [setEmailCheckMessage, setSetEmailCheckMessage] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { isOpen, setIsOpen } = useModal();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const { REQUEST_RESET_PASSWORD } = USER_API;

  useEffect(() => {
    //추후 전송 버튼 눌렀을 때 에러메시지 출력하게
    if (inputEmail.length > 0 && emailRegEx.test(inputEmail)) {
      setSetEmailCheckMessage('');
      setInputFieldChecked(false);
    } else {
      setSetEmailCheckMessage('유효한 이메일 형식이 아닙니다.');
      setInputFieldChecked(true);
    }
  }, [inputEmail]);

  useEffect(() => {
    if (!isOpen) {
      setSetEmailCheckMessage('');
      setInputEmail('');
      setInputFieldChecked(true);
    }
  }, [isOpen]);

  const handleSubmitSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputFieldChecked) {
      alert('비어있음');
    }
    const resData = { email: inputEmail };
    try {
      const res = await apiUtils({
        url: REQUEST_RESET_PASSWORD,
        method: 'POST',
        data: resData,
        withAuth: false,
      });
      console.log(res);
      if (res.message === '재설정 링크 전송 성공') {
        console.log('재설정 링크 전송 완료.');
      }
    } catch (error) {
      console.log(error);
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
            setIsOpen(isOpen);
            setInputFieldChecked(true);
          }}
        />
        <Styled.ModalField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <Styled.Text fontSize="1.2rem">비밀번호 재설정을 위한 이메일을 입력해주세요.</Styled.Text>
          <Styled.Form onSubmit={handleSubmitSendEmail}>
            <Styled.InputBoxContainer>
              <InputChecker
                inputTagType="text"
                placeholderText="이메일을 입력해주세요."
                onChange={setInputEmail}
                valid={emailRegEx.test(inputEmail)}
                checkMessage={setEmailCheckMessage}
              />
              <Styled.FindPasswordButtonContainer>
                <Button
                  type="submit"
                  disabled={inputFieldChecked}
                  width="100%"
                  border="none"
                  backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
                  textColor="white"
                  useHover={!inputFieldChecked}
                  useTransition={true}
                  transitionDuration={0.3}
                  hoverBackgroundColor="#3F82AC">
                  전송
                </Button>
              </Styled.FindPasswordButtonContainer>
            </Styled.InputBoxContainer>
          </Styled.Form>
        </Styled.ModalField>
      </Styled.ModalContainer>
    </Styled.ModalBackground>
  );
};

export default FindPassword;
