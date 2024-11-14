import * as Styled from './RegisterPage.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@common/DefaultButton/DefaultButton';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import authApi from '@apis/authApi/authApi';
import { ROUTE_LINK } from '@routes/routes';

//추후 컴포넌트 분리
const RegisterPage = () => {
  const [inputNickname, setInputNickname] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const [passwordConfirmStatus, setPasswordConfirmStatus] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();
  const [nicknameCheck, setNicknameCheck] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [confirmPasswordCheck, setConfirmPasswordCheck] = useState<string>('');

  const nicknameRegEx = /^(?! )[A-Za-z0-9가-힣]{2,}(?! )$/;
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;
  //아래 추후 분리해서 한곳에서 관리하게 API 관련 주소
  const REGISTER_API = '/api/signUp';

  useEffect(() => {
    if (
      inputNickname.length > 0 &&
      inputEmail.length > 0 &&
      inputPassword.length >= 8 &&
      inputConfirmPassword.length > 8
    ) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
    //닉네임 유효성 검사
    if (!nicknameRegEx.test(inputNickname)) {
      setNicknameCheck('닉네임은 공백 없이 2글자 이상이어야 합니다.');
    } else {
      setNicknameCheck('');
    }
    //이메일 유효성 검사
    if (!emailRegEx.test(inputEmail)) {
      setEmailCheck('유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailCheck('');
    }
    //비밀번호 유효성 검사
    if (!passwordRegEx.test(inputPassword)) {
      setPasswordCheck('비밀번호는 8~20자여야 합니다.');
    } else {
      setPasswordCheck('');
    }
    //비밀번호 확인 유효성 검사
    if (!passwordRegEx.test(inputConfirmPassword)) {
      setConfirmPasswordCheck('비밀번호는 8~20자여야 합니다.');
    } else {
      setConfirmPasswordCheck('');
    }
    //비밀번호 일치 확인
    if (inputPassword === inputConfirmPassword) {
      setErrorMsg('');
      setPasswordConfirmStatus(true);
    } else {
      setInputFieldChecked(true);
      setPasswordConfirmStatus(false);
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [inputNickname, inputEmail, inputPassword, inputConfirmPassword]);

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

  const handleSubmitUserData = async (event: React.FormEvent<HTMLFormElement>) => {
    //모든 필드가 채워져있는지 확인
    alert('실행!');
    if (
      inputNickname === '' ||
      inputEmail === '' ||
      inputPassword === '' ||
      inputConfirmPassword === ''
    ) {
      event.preventDefault();
      setErrorMsg('모든 필드를 채워주세요');
      return;
    }

    if (!passwordConfirmStatus) {
      event.preventDefault();
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    const resData = {
      email: inputEmail,
      password: inputPassword,
      nickname: inputNickname,
    };
    try {
      const res = await authApi.post(REGISTER_API, resData, {
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
      <p>{nicknameCheck}</p>
      <p>{emailCheck}</p>
      <p>{passwordCheck}</p>
      <p>{confirmPasswordCheck}</p>
      <Styled.RegisterContainer>
        <Styled.RegisterField>
          <Styled.MainLogo src={logo} />
          <Styled.RegisterText>Sign Up</Styled.RegisterText>
          <Styled.RegisterForm onSubmit={handleSubmitUserData}>
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
            <Styled.Divider>
              {errorMsg && (
                <Styled.ErrorMessage>
                  <IoAlertCircleOutline />
                  {errorMsg}
                </Styled.ErrorMessage>
              )}
            </Styled.Divider>
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
                disabled={inputFieldChecked}
                type="submit"
                width="40%"
                backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
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
