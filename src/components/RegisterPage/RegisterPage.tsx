import * as Styled from './RegisterPage.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@common/DefaultButton/DefaultButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authApi from '@apis/authApi/authApi';

const LOGIN_PAGE_URL = '/login';

const REGISTER_URL = '/api/users';

const RegisterPage = () => {
  const [inputNickname, setInputNickname] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (type === 'nickName') {
      setInputNickname(value);
    }
    if (type === 'email') {
      setInputEmail(value);
    }
    if (type === 'password') {
      setInputPassword(value);
    }
    if (type === 'confirmPassword') {
      setInputConfirmPassword(value);
    }
  };

  const handleSubmitUserData = async () => {
    const resData = {
      nickname: inputNickname,
      email: inputEmail,
      password: inputPassword,
      confirmPassword: inputConfirmPassword,
    };
    try {
      const res = await authApi.post(REGISTER_URL, resData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        navigate(LOGIN_PAGE_URL);
      }
    } catch (error) {
      console.error('회원가입 오류', error);
    }
  };

  return (
    <Styled.RegisterPageBackground>
      <button
        onClick={() => {
          console.log('닉네임', inputNickname);
          console.log('이메일', inputEmail);
          console.log('비밀번호', inputPassword);
          console.log('비밀번호 확인', inputConfirmPassword);
        }}>
        테스트
      </button>
      <Styled.RegisterContainer>
        <Styled.RegisterField>
          <Styled.MainLogo src={logo} />
          <Styled.RegisterText>Sign Up</Styled.RegisterText>
          <Styled.RegisterForm>
            <Styled.InputBoxContainer>
              <Styled.RegisterInput
                onChange={handleInputChange('nickName')}
                type="text"
                placeholder="닉네임"
              />
              <Styled.RegisterInput
                onChange={handleInputChange('email')}
                type="text"
                placeholder="이메일"
              />
              <Styled.RegisterInput
                onChange={handleInputChange('password')}
                type="password"
                placeholder="비밀번호"
              />
              <Styled.RegisterInput
                onChange={handleInputChange('confirmPassword')}
                type="password"
                placeholder="비밀번호 확인"
              />
            </Styled.InputBoxContainer>
            <Styled.RegisterButtonBox>
              <DefaultButton
                onClick={() => navigate(LOGIN_PAGE_URL)}
                width="40%"
                textColor="#79b0c8 "
                backgroundColor="white"
                border="1px solid #79B0CB">
                취소
              </DefaultButton>
              <DefaultButton
                disabled={false}
                onClick={() => {
                  handleSubmitUserData();
                  navigate(LOGIN_PAGE_URL);
                }}
                width="40%"
                backgroundColor="#79B0CB"
                border="none"
                textColor="white">
                회원가입
              </DefaultButton>
            </Styled.RegisterButtonBox>
          </Styled.RegisterForm>
        </Styled.RegisterField>
      </Styled.RegisterContainer>
    </Styled.RegisterPageBackground>
  );
};

export default RegisterPage;
