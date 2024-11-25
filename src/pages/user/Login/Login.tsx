import * as Styled from '@styles/Authentication/Authentication.styled';
import logo from '@assets/icon.png';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ROUTE_LINK } from '@routes/routes';
import { useModal } from '@stores/store';
import { USER_API } from '@routes/apiRoutes';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';
import { Button, AuthenticationInput } from 'components';
import { LoginFormData } from '@/type/input';

const LoginPage = () => {
  return (
    <Styled.PageBackground>
      <Styled.Container height="570px">
        <Styled.Field>
          <Styled.MainLogo src={logo} alt="로고 이미지" />
          <Styled.Text>Login</Styled.Text>
          <LoginForm />
        </Styled.Field>
      </Styled.Container>
    </Styled.PageBackground>
  );
};

const LoginForm = () => {
  const [inputData, setInputData] = useState<LoginFormData>({
    userEmail: '',
    password: '',
  });
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { setIsOpen, setModalState } = useModal();
  const { login } = useUserStore();
  const navigate = useNavigate();
  const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
  const ADMIN_MAIN = ROUTE_LINK.ADMIN_MAIN.link;
  const REGISTER_PAGE_URL = ROUTE_LINK.REGISTER.link;
  const { LOGIN } = USER_API;

  useEffect(() => {
    const { userEmail, password } = inputData;
    if (userEmail.length > 0 && password.length > 0) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
  }, [inputData]);

  const handleInputChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [type]: event.target.value }));
  };

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await apiUtils({
        url: LOGIN,
        method: 'POST',
        data: inputData,
        withAuth: false,
      });
      if (res.message === '로그인 성공') {
        login(res.data.user);
        if (res.data.user.level.name === '관리자') {
          SuccessToast('로그인 성공');
          setTimeout(() => {
            navigate(ADMIN_MAIN);
          }, 500);
          return;
        }
        SuccessToast('로그인 성공');
        setTimeout(() => {
          navigate(MAIN_PAGE_URL);
        }, 500);
      }
    } catch (error) {
      ErrorToast('로그인 실패');
      console.error('로그인 오류', error);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmitLogin}>
      <Styled.LoginInputBoxContainer>
        <AuthenticationInput
          forValue="email"
          labelPlaceHolder="이메일"
          onChange={handleInputChange('userEmail')}
        />
        <AuthenticationInput
          forValue="password"
          type="password"
          labelPlaceHolder="비밀번호"
          onChange={handleInputChange('password')}
        />
        <Styled.FindPasswordBox>
          <span
            onClick={() => {
              setModalState('findPassword');
              setIsOpen(true);
            }}>
            비밀번호 찾기
          </span>
        </Styled.FindPasswordBox>
        <Styled.ButtonContainer>
          <Button
            type="submit"
            disabled={inputFieldChecked}
            border="none"
            textColor="white"
            backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
            useHover={!inputFieldChecked}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#3F82AC">
            로그인
          </Button>
          <Button
            onClick={() => navigate(REGISTER_PAGE_URL)}
            border="none"
            textColor="#325366"
            useHover={true}
            useTransition={true}
            transitionDuration={0.2}
            hoverScale={1.1}>
            JOIN US
          </Button>
        </Styled.ButtonContainer>
      </Styled.LoginInputBoxContainer>
    </Styled.Form>
  );
};

export default LoginPage;
