import * as Styled from '@styles/Authentication/Authentication.styled';
import logo from '@assets/icon.png';
import { MdClose } from 'react-icons/md';
import { useModal } from '@stores/store';
import React, { useEffect, useState } from 'react';
import { USER_API } from '@routes/apiRoutes';
import apiUtils from '@utils/apiUtils';
import { REG_EX } from '@utils/RegEx';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { Button, InputChecker } from 'components';

export const FindPassword = () => {
  const [setEmailCheckMessage, setSetEmailCheckMessage] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const { isOpen, setIsOpen } = useModal();
  const { emailRegEx } = REG_EX;
  const { REQUEST_RESET_PASSWORD } = USER_API;

  useEffect(() => {
    //추후 전송 버튼 눌렀을 때 에러메시지 출력하게
    if (inputEmail.length > 0 && emailRegEx.test(inputEmail)) {
      setSetEmailCheckMessage('');
      setInputFieldChecked(false);
      return;
    }
    setSetEmailCheckMessage('유효한 이메일 형식이 아닙니다.');
    setInputFieldChecked(true);
  }, [inputEmail]);

  useEffect(() => {
    if (!isOpen) {
      setSetEmailCheckMessage('');
      setInputEmail('');
      setInputFieldChecked(true);
    }
  }, [isOpen]);

  const handleSubmitSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputFieldChecked) {
      ErrorToast('모든 필드를 채워주세요');
      return;
    }
    const resData = { email: inputEmail };
    try {
      const res = await apiUtils({
        url: REQUEST_RESET_PASSWORD,
        method: 'POST',
        data: resData,
        withAuth: false,
      });
      if (
        res.message ===
        '입력하신 이메일로 비밀번호 변경을 위한 링크를 발송 하였습니다. 1시간 이내 비밀번호 변경 바랍니다'
      ) {
        SuccessToast('메일 전송 성공');
      }
    } catch (error) {
      ErrorToast('이메일 전송 실패.');
      console.error(error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Styled.ModalBackground>
      <Styled.ModalContainer>
        <MdClose
          className="close"
          onClick={() => {
            setIsOpen(false);
            setInputFieldChecked(true);
          }}
        />
        <Styled.ModalField>
          <Styled.MainLogo src={logo} alt="로고이미지" />
          <Styled.Text fontSize="1.2rem">비밀번호 재설정을 위한 이메일을 입력해주세요.</Styled.Text>
          <Styled.Form onSubmit={handleSubmitSendEmail}>
            <Styled.InputBoxContainer>
              <InputChecker
                forValue="findEmail"
                inputTagType="text"
                placeholderText="이메일을 입력해주세요."
                onChange={(event) => setInputEmail(event.target.value)}
                valid={emailRegEx.test(inputEmail)}
                checkMessage={setEmailCheckMessage}
              />
              <Styled.FindPasswordButtonContainer>
                <Button
                  type="submit"
                  disabled={inputFieldChecked}
                  width="100%"
                  border="none"
                  backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
                  textColor="white"
                  useHover={!inputFieldChecked}
                  useTransition={true}
                  transitionDuration={0.3}
                  hoverBackgroundColor="#3F82AC">
                  전송
                </Button>
              </Styled.FindPasswordButtonContainer>
            </Styled.InputBoxContainer>
          </Styled.Form>
        </Styled.ModalField>
      </Styled.ModalContainer>
    </Styled.ModalBackground>
  );
};

export default FindPassword;
