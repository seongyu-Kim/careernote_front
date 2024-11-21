import * as Styled from '@styles/Authentication/Authentication.styled';
import logo from '@assets/icon.png';
import { Button, InputChecker, InputErrorMessage } from 'components';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ROUTE_LINK } from '@routes/routes';
import { USER_API } from '@routes/apiRoutes';
import apiUtils from '@utils/apiUtils';
import { REG_EX } from '@utils/RegEx';
import { useValidCheck } from '@stores/useCheckDuplication';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';

//추후 컴포넌트 분리
const Register = () => {
  const [inputNickname, setInputNickname] = useState<string>(''); // 닉네임 입력 값
  const [inputEmail, setInputEmail] = useState<string>(''); // 이메일 입력 값
  const [inputPassword, setInputPassword] = useState<string>(''); // 패스워드 입력 값
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>(''); // 패스워드 확인 입력 값
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true); // 입력 필드 체크
  const [passwordConfirmStatus, setPasswordConfirmStatus] = useState<boolean>(false); // 패스워드 일치 상태
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState<string>(''); // 닉네임 유효성 체크 메시지
  const [emailCheckMessage, setEmailCheckMessage] = useState<string>(''); // 이메일 유효성 체크 메시지
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>(''); // 패스워드 유효성 체크 메시지
  const [confirmPasswordCheckMessage, setConfirmPasswordCheckMessage] = useState<string>(''); // 패스워드 확인 유효성 체크 메시지
  const [notAccorPassword, setNotAccorPassword] = useState<string>(''); // 패스워드 불일치 시 에러 메세지 추후 리팩토링
  const { validCheck, setValidCheck, resetValidCheck } = useValidCheck();
  const navigate = useNavigate();

  const { nicknameRegEx, emailRegEx, passwordRegEx } = REG_EX;

  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;
  const { SIGNUP } = USER_API;

  useEffect(() => {
    const passwordMatching = inputPassword === inputConfirmPassword;
    const nicknameValid = inputNickname.length > 0 && nicknameRegEx.test(inputNickname);
    const emailValid = inputEmail.length > 0 && emailRegEx.test(inputEmail);
    const passwordValid = inputPassword.length >= 8 && passwordRegEx.test(inputPassword);
    const confirmPasswordValid =
      inputConfirmPassword.length >= 8 && passwordRegEx.test(inputConfirmPassword);
    const nickNameDuplication = validCheck.nickName;
    const emailDuplication = validCheck.email;

    if (
      passwordMatching &&
      nicknameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      nickNameDuplication &&
      emailDuplication
    ) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
    //닉네임 유효성 검사
    if (inputNickname.length > 0 && !nicknameRegEx.test(inputNickname)) {
      setNicknameCheckMessage('닉네임은 공백 없이 2글자 이상이어야 합니다.');
    } else {
      setNicknameCheckMessage('');
    }
    //이메일 유효성 검사
    if (inputEmail.length > 0 && !emailRegEx.test(inputEmail)) {
      setEmailCheckMessage('유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailCheckMessage('');
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
    //비밀번호 일치 확인
    if (inputPassword === inputConfirmPassword) {
      setNotAccorPassword('');
      setPasswordConfirmStatus(true);
    } else {
      setInputFieldChecked(true);
      setPasswordConfirmStatus(false);
      setNotAccorPassword('비밀번호가 일치하지 않습니다.');
    }
  }, [
    inputNickname,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    validCheck.nickName,
    validCheck.email,
  ]);

  useEffect(() => {
    setValidCheck('nickName', false);
  }, [inputNickname]);

  useEffect(() => {
    setValidCheck('email', false);
  }, [inputEmail]);

  const handleSubmitUserData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      inputNickname === '' ||
      inputEmail === '' ||
      inputPassword === '' ||
      inputConfirmPassword === ''
    ) {
      setNotAccorPassword('모든 필드를 채워주세요');
      return;
    }
    if (!passwordConfirmStatus) {
      setNotAccorPassword('비밀번호가 일치하지 않습니다.');
      return;
    }
    const resData = {
      email: inputEmail,
      password: inputPassword,
      nickname: inputNickname,
    };
    try {
      const res = await apiUtils({
        url: SIGNUP,
        method: 'POST',
        data: resData,
        withAuth: false,
      });
      if (res.message === '회원가입 성공') {
        resetValidCheck();
        SuccessToast('회원가입 성공');
        setTimeout(() => {
          navigate(LOGIN_PAGE_URL);
        }, 500);
      }
    } catch (error) {
      ErrorToast('회원가입 실패');
      console.error('회원가입 오류', error);
    }
  };

  return (
    <Styled.PageBackground>
      <Styled.Container height="830px">
        <Styled.Field>
          <Styled.MainLogo src={logo} alt="로고 이미지" />
          <Styled.Text>Sign Up</Styled.Text>
          <Styled.Form onSubmit={handleSubmitUserData}>
            <InputChecker
              forValue="email"
              inputTagType="text"
              onChange={setInputEmail}
              valid={emailRegEx.test(inputEmail)}
              placeholderText="이메일"
              checkMessage={emailCheckMessage}
              useCheckDuplication={true}
              checkDuplicationValue={inputEmail}
              checkDuplicationType="email"
              errorMsg={setEmailCheckMessage}
            />
            <InputChecker
              forValue="nickName"
              inputTagType="text"
              onChange={setInputNickname}
              valid={nicknameRegEx.test(inputNickname)}
              placeholderText="닉네임"
              checkMessage={nicknameCheckMessage}
              useCheckDuplication={true}
              checkDuplicationValue={inputNickname}
              checkDuplicationType="nickname"
              errorMsg={setNicknameCheckMessage}
            />
            <InputChecker
              forValue="password"
              inputTagType="password"
              onChange={setInputPassword}
              valid={passwordRegEx.test(inputPassword)}
              placeholderText="비밀번호"
              checkMessage={passwordCheckMessage}
            />
            <InputChecker
              forValue="confirmPassword"
              inputTagType="password"
              onChange={setInputConfirmPassword}
              valid={passwordRegEx.test(inputConfirmPassword)}
              placeholderText="비밀번호 확인."
              checkMessage={confirmPasswordCheckMessage}
            />
            <InputErrorMessage message={notAccorPassword} confirm={true} />
            <Styled.RegisterButtonContainer>
              <Button
                onClick={() => navigate(LOGIN_PAGE_URL)}
                width="40%"
                textColor="#79b0c8 "
                backgroundColor="white"
                border="1px solid #79B0CB">
                취소
              </Button>
              <Button
                disabled={inputFieldChecked}
                type="submit"
                width="40%"
                backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
                border="none"
                textColor="white"
                useHover={!inputFieldChecked}
                useTransition={true}
                transitionDuration={0.3}
                hoverBackgroundColor="#3F82AC">
                회원가입
              </Button>
            </Styled.RegisterButtonContainer>
          </Styled.Form>
        </Styled.Field>
      </Styled.Container>
    </Styled.PageBackground>
  );
};

export default Register;
