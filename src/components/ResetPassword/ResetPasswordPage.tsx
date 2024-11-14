import * as Styled from './ResetPassword.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@common/DefaultButton/DefaultButton';
import authApi from '@apis/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LINK } from '@routes/routes';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';

const ResetPasswordPage = () => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();
  const RESET_PASSWORD = '/api/reset-password';
  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;

  useEffect(() => {
    if (inputPassword === inputConfirmPassword) {
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [inputPassword, inputConfirmPassword]);

  const handleInputChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (type === 'password') {
      setInputPassword(value);
    }
    if (type === 'confirmPassword') {
      setInputConfirmPassword(value);
    }
  };

  const handleSubmitResetPassword = async () => {
    try {
      const res = await authApi.post(RESET_PASSWORD);

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
            <Styled.InputBoxContainer>
              <Styled.ResetPasswordInput
                type="password"
                onChange={() => handleInputChange('password')}
                placeholder="새 비밀번호"
              />
              <Styled.ResetPasswordInput
                type="password"
                onChange={() => handleInputChange('confirmPassword')}
                placeholder="새 비밀번호 확인"
              />
            </Styled.InputBoxContainer>
            <Styled.Divider>
              {errorMsg == '' ? null : (
                <Styled.ErrorMessage>
                  <IoAlertCircleOutline />
                  {errorMsg}
                </Styled.ErrorMessage>
              )}
            </Styled.Divider>
            <Styled.ResetPasswordButtonBox>
              <DefaultButton
                type="submit"
                border="none"
                textColor="white"
                backgroundColor="#79B0CB"
                useHover={true}
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

export default ResetPasswordPage;
