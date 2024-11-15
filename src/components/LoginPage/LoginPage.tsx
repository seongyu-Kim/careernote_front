import * as Styled from './LoginPage.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@common/DefaultButton/DefaultButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTE_LINK } from '@routes/routes';
import { useModal } from '@stores/store';
import authApi from '@apis/authApi/authApi';

const LoginPage = () => {
  const [inputId, setInputId] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inpuFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { isOpen, setIsOpen, setModalState, modalState } = useModal();
  const navigate = useNavigate();
  const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
  const REGISTER_PAGE_URL = ROUTE_LINK.REGISTER.link;

  const TEMP_LOGIN_API = '/api/users/signin';

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

  const handleSubmitLogin = async () => {
    const resData = {
      email: inputId,
      password: inputPassword,
    };
    try {
      const res = await authApi.post(TEMP_LOGIN_API, resData, {
        headers: {
          'Content-Type': 'application/json',
        },
        //여기에서 유저 정보 저장해주고 로컬스토리지 사용하기
      });
      if (res.status === 200) {
        navigate(MAIN_PAGE_URL);
      }
    } catch (error) {
      console.error('로그인 오류', error);
    }
  };
  return (
    <Styled.LoginPageBackground>
      <Styled.LoginContainer>
        <Styled.LoginField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <Styled.LoginText>Login</Styled.LoginText>
          <Styled.LoginForm onSubmit={handleSubmitLogin}>
            <Styled.InputBoxContainer>
              <Styled.LoginInput
                onChange={handleInputChange('id')}
                type="text"
                placeholder="아이디를 입력하세요."
              />
              <Styled.LoginInput
                onChange={handleInputChange('password')}
                type="password"
                placeholder="비밀번호를 입력하세요."
              />
            </Styled.InputBoxContainer>
            <Styled.FindPasswordBox>
              <span
                onClick={() => {
                  setModalState('findPassword');
                  setIsOpen(isOpen);
                }}>
                비밀번호 찾기
              </span>
            </Styled.FindPasswordBox>
            <Styled.LoginButtonBox>
              <DefaultButton
                type="submit"
                disabled={inpuFieldChecked}
                border="none"
                textColor="white"
                backgroundColor={inpuFieldChecked ? 'gray' : '#79B0CB'}
                useHover={!inpuFieldChecked}
                hoverBackgroundColor="#3F82AC">
                로그인
              </DefaultButton>
              <DefaultButton
                onClick={() => navigate(REGISTER_PAGE_URL)}
                border="none"
                textColor="#325366"
                useHover={true}
                useTransition={true}
                transitionDuration={0.2}
                hoverScale={1.1}>
                JOIN US
              </DefaultButton>
            </Styled.LoginButtonBox>
          </Styled.LoginForm>
        </Styled.LoginField>
      </Styled.LoginContainer>
    </Styled.LoginPageBackground>
  );
};

export default LoginPage;
