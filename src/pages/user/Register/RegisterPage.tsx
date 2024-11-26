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
import { RegisterFormData, ValidMessage } from '@/type/input';

//추후 컴포넌트 분리
const RegisterPage = () => {
  return (
    <Styled.PageBackground>
      <Styled.Container height="830px">
        <Styled.Field>
          <Styled.MainLogo src={logo} alt="로고 이미지" />
          <Styled.Text>Sign Up</Styled.Text>
          <RegisterForm />
        </Styled.Field>
      </Styled.Container>
    </Styled.PageBackground>
  );
};

const RegisterForm = () => {
  //상태 객체로 변경 예정
  const [inputData, setInputData] = useState<RegisterFormData>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [validMessage, setValidMessage] = useState<ValidMessage>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    confirmStatus: false,
  });
  const [notAccorPassword, setNotAccorPassword] = useState<string>(''); // 패스워드 불일치 시 에러 메세지 추후 리팩토링
  const { validCheck, setValidCheck, resetValidCheck } = useValidCheck();
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true); // 입력 필드 체크
  const navigate = useNavigate();

  const { nicknameRegEx, emailRegEx, passwordRegEx } = REG_EX;
  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;
  const { SIGNUP } = USER_API;

  const handleValidMessageChange = (type: string, message: string | boolean) => {
    setValidMessage((prev) => ({ ...prev, [type]: message }));
  };

  useEffect(() => {
    const passwordMatching = inputData.password === inputData.confirmPassword;
    const nicknameValid = inputData.nickname.length > 0 && nicknameRegEx.test(inputData.nickname);
    const emailValid = inputData.email.length > 0 && emailRegEx.test(inputData.email);
    const passwordValid = inputData.password.length >= 8 && passwordRegEx.test(inputData.password);
    const confirmPasswordValid =
      inputData.confirmPassword.length >= 8 && passwordRegEx.test(inputData.confirmPassword);
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
    if (inputData.nickname.length > 0 && !nicknameRegEx.test(inputData.nickname)) {
      handleValidMessageChange('nickname', '닉네임은 공백 없이 2글자 이상이어야 합니다.');
    } else {
      handleValidMessageChange('nickname', '');
    }
    //이메일 유효성 검사
    if (inputData.email.length > 0 && !emailRegEx.test(inputData.email)) {
      handleValidMessageChange('email', '유효한 이메일 형식이 아닙니다.');
    } else {
      handleValidMessageChange('email', '');
    }
    //비밀번호 유효성 검사
    if (inputData.password.length > 0 && !passwordRegEx.test(inputData.password)) {
      handleValidMessageChange('password', '비밀번호는 8~20자여야 합니다.');
    } else {
      handleValidMessageChange('password', '');
    }
    //비밀번호 확인 유효성 검사
    if (inputData.confirmPassword.length > 0 && !passwordRegEx.test(inputData.confirmPassword)) {
      handleValidMessageChange('confirmPassword', '비밀번호는 8~20자여야 합니다.');
    } else {
      handleValidMessageChange('confirmPassword', '');
    }
    //비밀번호 일치 확인
    if (passwordMatching) {
      setNotAccorPassword('');
      handleValidMessageChange('confirmStatus', true);
    } else {
      setInputFieldChecked(true);
      handleValidMessageChange('confirmStatus', false);
      setNotAccorPassword('비밀번호가 일치하지 않습니다.');
    }
  }, [inputData, validCheck.nickName, validCheck.email]);

  useEffect(() => {
    setValidCheck('nickName', false);
  }, [inputData.nickname]);

  useEffect(() => {
    setValidCheck('email', false);
  }, [inputData.email]);

  const handleInputChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [type]: event.target.value }));
  };

  const handleSubmitUserData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const field = Object.values(inputData).some((value) => value === '');
    if (field) {
      ErrorToast('모든 필드를 채워주세요');
      return;
    }
    if (!validMessage.confirmStatus) {
      ErrorToast('비밀번호가 일치하지 않습니다');
      return;
    }
    if (!validCheck.nickName || !validCheck.email) {
      ErrorToast('중복 확인을 진행해주세요');
      return;
    }
    try {
      const res = await apiUtils({
        url: SIGNUP,
        method: 'POST',
        data: {
          email: inputData.email,
          password: inputData.password,
          nickname: inputData.nickname,
        },
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
    <Styled.Form onSubmit={handleSubmitUserData}>
      <InputChecker
        forValue="email"
        inputTagType="text"
        onChange={handleInputChange('email')}
        valid={emailRegEx.test(inputData.email)}
        placeholderText="이메일"
        checkMessage={validMessage.email}
        useCheckDuplication={true}
        checkDuplicationValue={inputData.email}
        checkDuplicationType="email"
      />
      <InputChecker
        forValue="nickName"
        inputTagType="text"
        onChange={handleInputChange('nickname')}
        valid={nicknameRegEx.test(inputData.nickname)}
        placeholderText="닉네임"
        checkMessage={validMessage.nickname}
        useCheckDuplication={true}
        checkDuplicationValue={inputData.nickname}
        checkDuplicationType="nickname"
      />
      <InputChecker
        forValue="password"
        inputTagType="password"
        onChange={handleInputChange('password')}
        valid={passwordRegEx.test(inputData.password)}
        placeholderText="비밀번호"
        checkMessage={validMessage.password}
      />
      <InputChecker
        forValue="confirmPassword"
        inputTagType="password"
        onChange={handleInputChange('confirmPassword')}
        valid={passwordRegEx.test(inputData.confirmPassword)}
        placeholderText="비밀번호 확인"
        checkMessage={validMessage.confirmPassword}
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
  );
};

export default RegisterPage;
