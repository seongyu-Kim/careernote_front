import { useModal } from '@stores/store';
import * as Styled from '@styles/Authentication/Authentication.styled';
import { MdClose } from 'react-icons/md';
import { FaPenToSquare } from 'react-icons/fa6';
import { Button } from 'components';
import React, { useEffect, useState } from 'react';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { useUserStore } from '@stores/userStore';
import EditNicknameForm from '@components/Form/EditNickNameForm/EditNickNameForm';
import EditPasswordForm from '@components/Form/EditPasswordForm/EditPasswordForm';
import { useValidCheck } from '@stores/useCheckDuplication';
import apiUtils from '@utils/apiUtils';
import { USER_API } from '@routes/apiRoutes';

export const MyInfo = () => {
  const [isEditingNickname, setIsEditingNickname] = useState(false); // 닉네임 수정 ON OFF
  const [isEditingPassword, setIsEditingPassword] = useState(false); // 비밀번호 수정 ON OFF
  const { resetValidCheck } = useValidCheck();
  const { isOpen, setIsOpen } = useModal();
  const { user } = useUserStore();

  const { UPDATE_NICKNAME, UPDATE_PASSWORD } = USER_API;

  useEffect(() => {
    resetValidCheck();
  }, []);

  const handleNicknameSave = async (nickname: string) => {
    console.log('닉네임 저장:', nickname);
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
            setIsOpen(false);
            // setInputFieldChecked(true);
          }}
        />
        <Styled.ModalField>
          <Styled.MyInfoDivider />
          <Styled.Text fontSize="2.5rem">내 정보</Styled.Text>
          <Styled.TextContainer>
            <Styled.Text fontSize="1.2rem">{user?.nickName} 님</Styled.Text>
            {isEditingNickname ||
              (!isEditingPassword && (
                <FaPenToSquare
                  className="myInfoIcon"
                  onClick={() => setIsEditingNickname((prev) => !prev)}
                />
              ))}
          </Styled.TextContainer>
          {isEditingPassword ||
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
