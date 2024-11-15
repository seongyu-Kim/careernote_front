import * as Styled from './RegisterPage.styled';
import logo from '@assets/icon.png';
import DefaultButton from '@common/DefaultButton/DefaultButton';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import authApi from '@apis/authApi/authApi';
import { ROUTE_LINK } from '@routes/routes';

//추후 컴포넌트 분리
const RegisterPage = () => {
  const [inputNickname, setInputNickname] = useState<string>(''); // 닉네임 입력 값
  const [inputEmail, setInputEmail] = useState<string>(''); // 이메일 입력 값
  const [inputPassword, setInputPassword] = useState<string>(''); // 패스워드 입력 값
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>(''); // 패스워드 확인 입력 값
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true); // 입력 필드 체크
  const [passwordConfirmStatus, setPasswordConfirmStatus] = useState<boolean>(false); // 패스워드 일치 상태
  const [nicknameCheck, setNicknameCheck] = useState<string>(''); // 닉네임 유효성 체크 메시지
  const [emailCheck, setEmailCheck] = useState<string>(''); // 이메일 유효성 체크 메시지
  const [passwordCheck, setPasswordCheck] = useState<string>(''); // 패스워드 유효성 체크 메시지
  const [confirmPasswordCheck, setConfirmPasswordCheck] = useState<string>(''); // 패스워드 확인 유효성 체크 메시지
  const [errorMsg, setErrorMsg] = useState<string>(''); // 패스워드 불일치 시 에러 메세지 추후 리팩토링
  const navigate = useNavigate();

  const nicknameRegEx = /^(?! )[A-Za-z0-9가-힣]{2,}(?! )$/;
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;
  //아래 추후 분리해서 한곳에서 관리하게 API 관련 주소
  const TEMP_REGISTER_API = '/api/signUp';

  useEffect(() => {
    const passwordMatching = inputPassword === inputConfirmPassword;
    const nicknameValid = inputNickname.length > 0 && nicknameRegEx.test(inputNickname);
    const emailValid = inputEmail.length > 0 && emailRegEx.test(inputEmail);
    const passwordValid = inputPassword.length >= 8 && passwordRegEx.test(inputPassword);
    const confirmPasswordValid =
      inputConfirmPassword.length >= 8 && passwordRegEx.test(inputConfirmPassword);

    if (passwordMatching && nicknameValid && emailValid && passwordValid && confirmPasswordValid) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
    //닉네임 유효성 검사
    if (inputNickname.length > 0 && !nicknameRegEx.test(inputNickname)) {
      setNicknameCheck('닉네임은 공백 없이 2글자 이상이어야 합니다.');
    } else {
      setNicknameCheck('');
    }
    //이메일 유효성 검사
    if (inputEmail.length > 0 && !emailRegEx.test(inputEmail)) {
      setEmailCheck('유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailCheck('');
    }
    //비밀번호 유효성 검사
    if (inputPassword.length > 0 && !passwordRegEx.test(inputPassword)) {
      setPasswordCheck('비밀번호는 8~20자여야 합니다.');
    } else {
      setPasswordCheck('');
    }
    //비밀번호 확인 유효성 검사
    if (inputConfirmPassword.length > 0 && !passwordRegEx.test(inputConfirmPassword)) {
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
      console.log(11);
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
      const res = await authApi.post(
        'http://kdt-react-1-team01.elicecoding.com:3002/api/user//signUp',
        resData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('응답결과', res);
      if (res.status === 200) {
        navigate(LOGIN_PAGE_URL);
      }
    } catch (error) {
      console.error('회원가입 오류', error);
    }
  };

  const test = async () => {
    //모든 필드가 채워져있는지 확인
    console.log('테스트 요청 실행');
    if (
      inputNickname === '' ||
      inputEmail === '' ||
      inputPassword === '' ||
      inputConfirmPassword === ''
    ) {
      setErrorMsg('모든 필드를 채워주세요');
      console.log(11);
      return;
    }

    if (!passwordConfirmStatus) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      console.log(11);
      return;
    }

    const resData = {
      email: inputEmail,
      password: inputPassword,
      nickname: inputNickname,
    };
    try {
      const res = await authApi.post(
        'http://kdt-react-1-team01.elicecoding.com:3002/api/user/signUp',
        resData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('응답결과', res);
      if (res.status === 200) {
        navigate(LOGIN_PAGE_URL);
      }
    } catch (error) {
      console.error('회원가입 오류', error);
    }
  };

  return (
    <Styled.RegisterPageBackground>
      <Styled.RegisterContainer>
        <Styled.RegisterField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <button type="button" onClick={() => test()}>
            회원가입 확인하기
          </button>
          <Styled.RegisterText>Sign Up</Styled.RegisterText>
          <Styled.RegisterForm onSubmit={handleSubmitUserData}>
            <Styled.InputBoxContainer>
              <Styled.InputWrapper>
                <Styled.RegisterInput
                  onChange={handleInputChange('nickName')}
                  type="text"
                  placeholder="닉네임"
                />
                {nicknameRegEx.test(inputNickname) && <FaRegCheckCircle className="checkIcon" />}
              </Styled.InputWrapper>
              <Styled.Divider>
                {nicknameCheck && (
                  <Styled.InputFiledErrorMessage>
                    <IoAlertCircleOutline />
                    {nicknameCheck}
                  </Styled.InputFiledErrorMessage>
                )}
              </Styled.Divider>
              <Styled.InputWrapper>
                <Styled.RegisterInput
                  onChange={handleInputChange('email')}
                  type="text"
                  placeholder="이메일"
                />
                {emailRegEx.test(inputEmail) && <FaRegCheckCircle className="checkIcon" />}
              </Styled.InputWrapper>
              <Styled.Divider>
                {emailCheck && (
                  <Styled.InputFiledErrorMessage>
                    <IoAlertCircleOutline />
                    {emailCheck}
                  </Styled.InputFiledErrorMessage>
                )}
              </Styled.Divider>
              <Styled.InputWrapper>
                <Styled.RegisterInput
                  onChange={handleInputChange('password')}
                  type="password"
                  placeholder="비밀번호"
                />
                {passwordRegEx.test(inputPassword) && <FaRegCheckCircle className="checkIcon" />}
              </Styled.InputWrapper>
              <Styled.Divider>
                {passwordCheck && (
                  <Styled.InputFiledErrorMessage>
                    <IoAlertCircleOutline />
                    {passwordCheck}
                  </Styled.InputFiledErrorMessage>
                )}
              </Styled.Divider>
              <Styled.InputWrapper>
                <Styled.RegisterInput
                  onChange={handleInputChange('confirmPassword')}
                  type="password"
                  placeholder="비밀번호 확인"
                />
                {passwordRegEx.test(inputConfirmPassword) && (
                  <FaRegCheckCircle className="checkIcon" />
                )}
              </Styled.InputWrapper>
              <Styled.Divider>
                {confirmPasswordCheck && (
                  <Styled.InputFiledErrorMessage>
                    <IoAlertCircleOutline />
                    {confirmPasswordCheck}
                  </Styled.InputFiledErrorMessage>
                )}
              </Styled.Divider>
            </Styled.InputBoxContainer>
            <Styled.Divider>
              {errorMsg && (
                <Styled.PasswordErrorMessage>
                  <IoAlertCircleOutline />
                  {errorMsg}
                </Styled.PasswordErrorMessage>
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
