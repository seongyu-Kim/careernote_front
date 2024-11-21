import * as Styled from '@styles/Authentication/Authentication.styled';
import logo from '@assets/icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_LINK } from '@routes/routes';
import React, { useEffect, useState } from 'react';
import { USER_API } from '@routes/apiRoutes';
import apiUtils from '@utils/apiUtils';
import { REG_EX } from '@utils/RegEx';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { Button, InputChecker, InputErrorMessage } from 'components';

const ResetPassword = () => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>(''); // 패스워드 유효성 체크 메시지
  const [confirmPasswordCheckMessage, setConfirmPasswordCheckMessage] = useState<string>(''); // 패스워드 확인 유효성 체크 메시지
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { token } = useParams();
  const navigate = useNavigate();

  const { passwordRegEx } = REG_EX;
  const { RESET_PASSWORD } = USER_API;
  const LOGIN_PAGE_URL = ROUTE_LINK.LOGIN.link;

  useEffect(() => {
    const passwordMatching = inputPassword === inputConfirmPassword;
    const passwordValid = inputPassword.length >= 8 && passwordRegEx.test(inputPassword);
    const confirmPasswordValid =
      inputConfirmPassword.length >= 8 && passwordRegEx.test(inputConfirmPassword);

    if (passwordMatching && passwordValid && confirmPasswordValid) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
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

    if (inputPassword === inputConfirmPassword) {
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [inputPassword, inputConfirmPassword]);

  const handleSubmitResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resData = {
      new_password: inputPassword,
    };
    try {
      const res = await apiUtils({
        url: RESET_PASSWORD,
        method: 'PUT',
        data: resData,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.message === '비밀번호가 정상적으로 변경되었습니다') {
        SuccessToast('비밀번호 재설정 성공');
        setTimeout(() => {
          navigate(LOGIN_PAGE_URL);
        }, 500);
      }
      if (res.message === '토큰이 만료되었습니다.' || res.message === '유효하지 않은 토큰입니다.')
        ErrorToast('비밀번호 재설정 실패');
    } catch (error) {
      ErrorToast('비밀번호 재설정 오류');
      console.error('비밀번호 재설정 오류', error);
    }
  };

  return (
    <Styled.PageBackground>
      <Styled.Container height="600px">
        <Styled.Field>
          <Styled.MainLogo src={logo} alt="로고 이미지" />
          <Styled.Text fontSize="2.5rem">비밀번호 재설정</Styled.Text>
          <Styled.Form onSubmit={handleSubmitResetPassword}>
            <InputChecker
              inputTagType="password"
              placeholderText="새 비밀번호"
              onChange={setInputPassword}
              valid={passwordRegEx.test(inputPassword)}
              checkMessage={passwordCheckMessage}
            />
            <InputChecker
              inputTagType="password"
              placeholderText="새 비밀번호 확인"
              onChange={setInputConfirmPassword}
              valid={passwordRegEx.test(inputConfirmPassword)}
              checkMessage={confirmPasswordCheckMessage}
            />
            <InputErrorMessage message={errorMsg} confirm={true} />
            <Styled.PasswordButtonContainer>
              <Button
                disabled={inputFieldChecked}
                type="submit"
                border="none"
                textColor="white"
                backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
                useHover={!inputFieldChecked}
                useTransition={true}
                transitionDuration={0.3}
                hoverBackgroundColor="#3F82AC">
                재설정
              </Button>
            </Styled.PasswordButtonContainer>
          </Styled.Form>
        </Styled.Field>
      </Styled.Container>
    </Styled.PageBackground>
  );
};

export default ResetPassword;
