import * as Styled from '@components/ResetPassword/ResetPassword.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import authApi from '@apis/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LINK } from '@routes/routes';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import InputValid from '@components/InputValid/InputValid';

const ResetPassword = () => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>(''); // 패스워드 유효성 체크 메시지
  const [confirmPasswordCheckMessage, setConfirmPasswordCheckMessage] = useState<string>(''); // 패스워드 확인 유효성 체크 메시지
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  const TEMP_RESET_PASSWORD = '/api/users';
  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;

  useEffect(() => {
    const passwordMatching = inputPassword === inputConfirmPassword;
    const passwordValid = inputPassword.length >= 8 && passwordRegEx.test(inputPassword);
    const confirmPasswordValid =
      inputConfirmPassword.length >= 8 && passwordRegEx.test(inputConfirmPassword);

    if (passwordMatching && passwordValid && confirmPasswordValid) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
    //비밀번호 유효성 검사
    if (inputPassword.length > 0 && !passwordRegEx.test(inputPassword)) {
      setPasswordCheckMessage('비밀번호는 8~20자여야 합니다.');
    } else {
      setPasswordCheckMessage('');
    }
    //비밀번호 확인 유효성 검사
    if (inputConfirmPassword.length > 0 && !passwordRegEx.test(inputConfirmPassword)) {
      setConfirmPasswordCheckMessage('비밀번호는 8~20자여야 합니다.');
    } else {
      setConfirmPasswordCheckMessage('');
    }

    if (inputPassword === inputConfirmPassword) {
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [inputPassword, inputConfirmPassword]);

  const handleSubmitResetPassword = async () => {
    alert('실행!');
    const resData = {
      password: inputPassword,
      // token: 토큰 가져와서 넣어주기
    };
    try {
      const res = await authApi.post(TEMP_RESET_PASSWORD, resData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        navigate(LOGIN_PAGE_URL);
      }
    } catch (error) {
      console.log('비밀번호 재설정 오류', error);
    }
  };

  return (
    <Styled.ResetPasswordPageBackground>
      <Styled.ResetPasswordContainer>
        <Styled.ResetPasswordField>
          <Styled.MainLogo src={logo} />
          <Styled.ResetPasswordText>비밀번호 재설정</Styled.ResetPasswordText>
          <Styled.ResetPasswordForm onSubmit={handleSubmitResetPassword}>
            <InputValid
              inputTagType="password"
              placeholderText="새 비밀번호"
              onChange={setInputPassword}
              valid={passwordRegEx.test(inputPassword)}
              checkMessage={passwordCheckMessage}
            />
            <InputValid
              inputTagType="password"
              placeholderText="새 비밀번호 확인"
              onChange={setInputConfirmPassword}
              valid={passwordRegEx.test(inputConfirmPassword)}
              checkMessage={confirmPasswordCheckMessage}
            />
            <Styled.Divider>
              {errorMsg == '' ? null : (
                <Styled.PasswordErrorMessage>
                  <IoAlertCircleOutline />
                  {errorMsg}
                </Styled.PasswordErrorMessage>
              )}
            </Styled.Divider>
            <Styled.ResetPasswordButtonBox>
              <DefaultButton
                disabled={inputFieldChecked}
                type="submit"
                border="none"
                textColor="white"
                backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
                useHover={!inputFieldChecked}
                hoverBackgroundColor="#3F82AC">
                재설정
              </DefaultButton>
            </Styled.ResetPasswordButtonBox>
          </Styled.ResetPasswordForm>
        </Styled.ResetPasswordField>
      </Styled.ResetPasswordContainer>
    </Styled.ResetPasswordPageBackground>
  );
};

export default ResetPassword;
