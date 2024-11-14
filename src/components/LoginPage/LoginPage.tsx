import * as Styled from './LoginPage.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@common/DefaultButton/DefaultButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTE_LINK } from '@routes/routes';
import { useFindPasswordModal } from '@stores/store';
import FindPassword from '@components/Modal/FindPassword';

const LoginPage = () => {
  const [inputId, setInputId] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inpuFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { isOpen, setIsOpen } = useFindPasswordModal();
  const navigate = useNavigate();
  const REGISTER_PAGE_URL = ROUTE_LINK.REGISTER.link;

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

  return (
    <Styled.LoginPageBackground>
      <Styled.LoginContainer>
        <Styled.LoginField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <Styled.LoginText>Login</Styled.LoginText>
          <Styled.LoginForm>
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
                  setIsOpen(isOpen);
                }}>
                비밀번호 찾기
              </span>
              {isOpen && <FindPassword />}
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
