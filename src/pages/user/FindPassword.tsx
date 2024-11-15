import * as Styled from '@components/common/Modal/FindPasswordModal/FindPassword.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import { MdClose } from 'react-icons/md';
import { useModal } from '@stores/store';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import { USER_API } from '@routes/apiRoutes';

export const FindPassword = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { isOpen, setIsOpen } = useModal();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const { REQUEST_RESET_PASSWORD } = USER_API;

  useEffect(() => {
    //추후 전송 버튼 눌렀을 때 에러메시지 출력하게
    if (inputEmail.length > 0 && emailRegEx.test(inputEmail)) {
      setErrorMsg('유효한 이메일 형식이 아닙니다.');
      setInputFieldChecked(true);
    } else {
      setErrorMsg('');
      setInputFieldChecked(false);
    }
  }, [inputEmail]);

  const handleInputChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleSubmitSendEmail = async () => {
    alert('실행!');
    if (inputFieldChecked) {
      alert('비어있음');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Styled.FindPasswordBackground>
      <Styled.FindPasswordContainer>
        <MdClose className="close" onClick={() => setIsOpen(isOpen)} />
        <Styled.FindPasswordField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <Styled.FindPasswordText>
            비밀번호 재설정을 위한 이메일을 입력해주세요.
          </Styled.FindPasswordText>
          <Styled.FindPasswordForm onSubmit={handleSubmitSendEmail}>
            <Styled.FindPasswordInput onChange={handleInputChange()} placeholder="이메일" />
            <Styled.Divider>
              {errorMsg && (
                <Styled.ErrorMessage>
                  <IoAlertCircleOutline />
                  {errorMsg}
                </Styled.ErrorMessage>
              )}
            </Styled.Divider>
            <DefaultButton
              // type="submit"
              onClick={handleSubmitSendEmail}
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
