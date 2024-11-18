import * as Styled from '@styles/Authentication/Authentication.styled';
import logo from '@assets/icon.png';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ROUTE_LINK } from '@routes/routes';
import { useModal } from '@stores/store';
import { USER_API } from '@routes/apiRoutes';
import Input from '@components/Input/Input';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { LoginInputBoxContainer } from '@styles/Authentication/Authentication.styled';

const LoginPage = () => {
  const [inputId, setInputId] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { isOpen, setIsOpen, setModalState } = useModal();
  const { login } = useUserStore();
  const navigate = useNavigate();
  const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
  const REGISTER_PAGE_URL = ROUTE_LINK.REGISTER.link;
  const { LOGIN } = USER_API;

  useEffect(() => {
    if (inputId.length > 0 && inputPassword.length > 0) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
  }, [inputId, inputPassword]);

  const handleInputChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (type === 'id') {
      setInputId(value);
    }
    if (type === 'password') {
      setInputPassword(value);
    }
  };

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('로그인 제출!');
    const resData = {
      userEmail: inputId,
      password: inputPassword,
    };
    try {
      const res = await apiUtils({
        url: `http://kdt-react-1-team01.elicecoding.com:3002${LOGIN}`,
        method: 'POST',
        data: resData,
        withAuth: false,
      });
      if (res.message === '로그인 성공') {
        login(res.data.user);
        navigate(MAIN_PAGE_URL);
      }
    } catch (error) {
      console.error('로그인 오류', error);
    }
  };
  return (
    <Styled.PageBackground>
      <Styled.Container height="570px">
        <Styled.Field>
          <Styled.MainLogo src={logo} alt="로고 이미지" />
          <Styled.Text>Login</Styled.Text>
          <Styled.Form onSubmit={handleSubmitLogin}>
            <Styled.LoginInputBoxContainer>
              <Input
                onChange={handleInputChange('id')}
                type="text"
                placeholder="아이디를 입력하세요."
                width="100%"
                height="40px"
                border="1px solid #b3d5eb"
                backgroundColor="#f0f7fb"
                caretColor="#79b0c8"
                padding="3%"
                placeholderColor="#79b0c8"
              />
              <Input
                onChange={handleInputChange('password')}
                type="password"
                placeholder="비밀번호를 입력하세요."
                width="100%"
                height="40px"
                border="1px solid #b3d5eb"
                backgroundColor="#f0f7fb"
                caretColor="#79b0c8"
                padding="3%"
                placeholderColor="#79b0c8"
              />
              <Styled.FindPasswordBox>
                <span
                  onClick={() => {
                    setModalState('findPassword');
                    setIsOpen(isOpen);
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
        </Styled.Field>
      </Styled.Container>
    </Styled.PageBackground>
  );
};

export default LoginPage;
