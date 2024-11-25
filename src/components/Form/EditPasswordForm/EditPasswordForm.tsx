import { Button, AuthenticationInput } from 'components';
import styled from 'styled-components';
import { useState } from 'react';
import { ErrorToast } from '@utils/ToastUtils';
import { REG_EX } from '@utils/RegEx';
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ButtonContainer = styled.div`
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-direction: column;
`;
const EditPasswordForm = ({
  onSave,
}: {
  onSave: (currentPassword: string, newPassword: string) => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { passwordRegEx } = REG_EX;

  const handleSave = () => {
    const currentPasswordRegEx = currentPassword.length >= 8 && passwordRegEx.test(currentPassword);
    const newPasswordRegEx = newPassword.length >= 8 && passwordRegEx.test(newPassword);
    const confirmPasswordRegEx = confirmPassword.length >= 8 && passwordRegEx.test(confirmPassword);
    if (newPassword !== confirmPassword) {
      ErrorToast('새 비밀번호가 일치하지 않습니다');
      return;
    }
    if (!currentPasswordRegEx || !newPasswordRegEx || !confirmPasswordRegEx) {
      ErrorToast('비밀번호는 8~20자여야 합니다');
      return;
    }
    if (currentPassword === newPassword) {
      ErrorToast('현재 비밀번호와 새 비밀번호가 같습니다');
      return;
    }
    onSave(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <InputContainer>
      <AuthenticationInput
        forValue="currentPassword"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        labelPlaceHolder="현재 비밀번호"
        width="100%"
        height="40px"
        border="1px solid #b3d5eb"
        backgroundColor="#f0f7fb"
        caretColor="#79b0c8"
        padding="3%"
        placeholderColor="#79b0c8"
      />
      <AuthenticationInput
        forValue="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        labelPlaceHolder="새 비밀번호"
        width="100%"
        height="40px"
        border="1px solid #b3d5eb"
        backgroundColor="#f0f7fb"
        caretColor="#79b0c8"
        padding="3%"
        placeholderColor="#79b0c8"
      />
      <AuthenticationInput
        forValue="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        labelPlaceHolder="새 비밀번호 확인"
        width="100%"
        height="40px"
        border="1px solid #b3d5eb"
        backgroundColor="#f0f7fb"
        caretColor="#79b0c8"
        padding="3%"
        placeholderColor="#79b0c8"
      />
      <ButtonContainer>
        <Button
          onClick={handleSave}
          border="none"
          backgroundColor="#79b0c8"
          textColor="white"
          useHover={true}
          useTransition={true}
          transitionDuration={0.3}
          hoverBackgroundColor="#3F82AC">
          저장
        </Button>
      </ButtonContainer>
    </InputContainer>
  );
};

export default EditPasswordForm;
