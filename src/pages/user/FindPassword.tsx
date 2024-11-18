import * as Styled from '@components/common/Modal/FindPasswordModal/FindPassword.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import { MdClose } from 'react-icons/md';
import { useModal } from '@stores/store';
import React, { useEffect, useState } from 'react';
import { USER_API } from '@routes/apiRoutes';
import InputValid from '@components/InputValid/InputValid';
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
        url: `http://kdt-react-1-team01.elicecoding.com:3002${REQUEST_RESET_PASSWORD}`,
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
    <Styled.FindPasswordBackground>
      <Styled.FindPasswordContainer>
        <MdClose
          className="close"
          onClick={() => {
            setIsOpen(isOpen);
            setInputFieldChecked(true);
          }}
        />
        <Styled.FindPasswordField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <Styled.FindPasswordText>
            비밀번호 재설정을 위한 이메일을 입력해주세요.
          </Styled.FindPasswordText>
          <Styled.FindPasswordForm onSubmit={handleSubmitSendEmail}>
            <InputValid
              inputTagType="text"
              placeholderText="이메일을 입력해주세요."
              onChange={setInputEmail}
              valid={emailRegEx.test(inputEmail)}
              checkMessage={setEmailCheckMessage}
            />
            <DefaultButton
              type="submit"
              disabled={inputFieldChecked}
              width="40%"
              border="none"
              backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
              textColor="white">
              전송
            </DefaultButton>
          </Styled.FindPasswordForm>
        </Styled.FindPasswordField>
      </Styled.FindPasswordContainer>
    </Styled.FindPasswordBackground>
  );
};

export default FindPassword;
