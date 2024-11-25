import { useModal } from '@stores/store';
import * as Styled from '@styles/Authentication/Authentication.styled';
import { MdClose } from 'react-icons/md';
import { FaPenToSquare } from 'react-icons/fa6';
import { AuthenticationInput, Button } from 'components';
import React, { useEffect, useState } from 'react';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { useUserStore } from '@stores/userStore';
import EditNicknameForm from '@components/Form/EditNickNameForm/EditNickNameForm';
import EditPasswordForm from '@components/Form/EditPasswordForm/EditPasswordForm';
import { useValidCheck } from '@stores/useCheckDuplication';
import apiUtils from '@utils/apiUtils';
import { USER_API } from '@routes/apiRoutes';
import { REG_EX } from '@utils/RegEx';
import axios from 'axios';

export const MyInfo = () => {
  const [isEditingNickname, setIsEditingNickname] = useState(false); // 닉네임 수정 ON OFF
  const [isEditingPassword, setIsEditingPassword] = useState(false); // 비밀번호 수정 ON OFF
  const [currentPassword, setCurrentPassword] = useState({
    currentPassword: '',
    userCheck: false,
  });
  const { resetValidCheck } = useValidCheck();
  const { isOpen, setIsOpen } = useModal();
  const { user } = useUserStore();

  const { UPDATE_NICKNAME, UPDATE_PASSWORD, CONFIRM_USER } = USER_API;
  const { passwordRegEx } = REG_EX;

  useEffect(() => {
    resetValidCheck();
    if (!isOpen) {
      handleInputChange(false)();
      handleInputChange('reset')();
    }
  }, [isOpen]);

  const handleInputChange =
    (type: string | boolean) => (event?: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'reset') {
        setCurrentPassword({ currentPassword: '', userCheck: false });
        return;
      }
      if (typeof type === 'boolean') {
        setCurrentPassword((prev) => ({ ...prev, userCheck: type }));
        return;
      }
      setCurrentPassword((prev) => ({ ...prev, [type]: event?.target.value }));
      return;
    };

  const handleSubmitCurrentPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await apiUtils({
        url: CONFIRM_USER,
        method: 'POST',
        data: { password: currentPassword.currentPassword },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.message === '유저확인 완료') {
        handleInputChange(true)();
        SuccessToast('확인 성공');
      }
    } catch (error) {
      handleInputChange(false)();
      ErrorToast('현재 비밀번호를 확인해주세요');
      console.error(error);
    }
  };

  const handleNicknameSave = async (nickname: string) => {
    const { nicknameRegEx } = REG_EX;
    if (nickname.length <= 2 || !nicknameRegEx.test(nickname)) {
      ErrorToast('닉네임을 입력해주세요');
    }
    try {
      const res = await apiUtils({
        url: UPDATE_NICKNAME,
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        data: { nickname: nickname },
      });
      if (res.message === '닉네임이 정상적으로 변경되었습니다') {
        SuccessToast('닉네임 변경 성공');
        setIsEditingNickname(false);
      }
    } catch (error) {
      ErrorToast('닉네임 변경 실패');
      console.error(error);
    }
  };

  const handlePasswordSave = async (currentPassword: string, newPassword: string) => {
    const resData = { current_password: currentPassword, new_password: newPassword };
    try {
      const res = await apiUtils({
        url: UPDATE_PASSWORD,
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        data: resData,
      });
      if (res.message === '비밀번호가 정상적으로 변경되었습니다') {
        SuccessToast('비밀번호 변경 성공');
        setIsEditingPassword(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        ErrorToast('현재 비밀번호가 일치하지 않습니다.');
        return;
      }
      ErrorToast('비밀번호 변경 실패');
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
            setIsEditingNickname(false);
            setIsEditingPassword(false);
            setIsOpen(false);
          }}
        />
        <Styled.ModalField>
          <Styled.MyInfoDivider />
          <Styled.Text fontSize="2.5rem">내 정보 수정</Styled.Text>
          <Styled.TextContainer>
            <Styled.Text fontSize="1.2rem">{user?.nickName} 님</Styled.Text>
            {!currentPassword.userCheck ||
              isEditingNickname ||
              (!isEditingPassword && (
                <FaPenToSquare
                  className="myInfoIcon"
                  onClick={() => setIsEditingNickname((prev) => !prev)}
                />
              ))}
          </Styled.TextContainer>
          {!currentPassword.userCheck && (
            <Styled.MyInfoForm onSubmit={handleSubmitCurrentPassword}>
              <Styled.CurrentPasswordMyInfoContainer>
                <AuthenticationInput
                  forValue="userCurrentPassword"
                  type="password"
                  labelPlaceHolder="비밀번호"
                  onChange={handleInputChange('currentPassword')}
                />
                <Button
                  type="submit"
                  width="80%"
                  disabled={!passwordRegEx.test(currentPassword.currentPassword)}
                  border="none"
                  textColor="white"
                  backgroundColor={
                    !passwordRegEx.test(currentPassword.currentPassword) ? 'gray' : '#79B0CB'
                  }
                  useHover={passwordRegEx.test(currentPassword.currentPassword)}
                  useTransition={true}
                  transitionDuration={0.3}
                  hoverBackgroundColor="#3F82AC">
                  확인
                </Button>
              </Styled.CurrentPasswordMyInfoContainer>
            </Styled.MyInfoForm>
          )}
          {!currentPassword.userCheck ||
            isEditingPassword ||
            (!isEditingNickname && (
              <Button
                border="none"
                backgroundColor="#79B0CB"
                textColor="white"
                padding="7px"
                width="50%"
                useHover={true}
                useTransition={true}
                transitionDuration={0.3}
                hoverBackgroundColor="#3F82AC"
                onClick={() => setIsEditingPassword((prev) => !prev)}>
                비밀번호 변경
              </Button>
            ))}
          <Styled.Form>
            <Styled.InputBoxContainer>
              <Styled.MyInfoButtonContainer></Styled.MyInfoButtonContainer>
              {isEditingNickname && <EditNicknameForm onSave={handleNicknameSave} />}
              {isEditingPassword && <EditPasswordForm onSave={handlePasswordSave} />}
              <Styled.PasswordButtonContainer>
                {isEditingNickname || isEditingPassword ? (
                  <Button
                    onClick={() => {
                      setIsEditingNickname(false);
                      setIsEditingPassword(false);
                    }}
                    border="none"
                    textColor="white"
                    backgroundColor="#AB5A5A"
                    useHover={true}
                    hoverBackgroundColor="#A14242"
                    useTransition={true}
                    transitionDuration={0.2}>
                    취소
                  </Button>
                ) : null}
              </Styled.PasswordButtonContainer>
            </Styled.InputBoxContainer>
          </Styled.Form>
        </Styled.ModalField>
      </Styled.ModalContainer>
    </Styled.ModalBackground>
  );
};
