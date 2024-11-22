import Button from '@components/Button/Button';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputChecker from '@components/InputChecker/InputChecker';
import { REG_EX } from '@utils/RegEx';
import { useValidCheck } from '@stores/useCheckDuplication';

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditNicknameForm = ({ onSave }: { onSave: (nickname: string) => void }) => {
  const [nickname, setNickname] = useState('');
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState<string>('');
  const { validCheck, setValidCheck, resetValidCheck } = useValidCheck();
  const { nicknameRegEx } = REG_EX;

  useEffect(() => {
    if (nickname.length > 0 && !nicknameRegEx.test(nickname)) {
      setNicknameCheckMessage('닉네임은 공백 없이 2글자 이상이어야 합니다.');
    } else {
      setNicknameCheckMessage('');
    }
  }, [nickname]);

  useEffect(() => {
    setValidCheck('nickName', false);
  }, [nickname]);

  const handleSave = () => {
    onSave(nickname);
    setNickname('');
  };

  return (
    <InputContainer>
      <InputChecker
        forValue="changeNickname"
        inputTagType="text"
        placeholderText="새 닉네임"
        onChange={(event) => setNickname(event.target.value)}
        valid={nicknameRegEx.test(nickname)}
        checkMessage={nicknameCheckMessage}
        useCheckDuplication={true}
        checkDuplicationValue={nickname}
        checkDuplicationType="nickname"
      />
      <Button
        onClick={() => {
          handleSave();
          resetValidCheck();
        }}
        border={!validCheck.nickName ? 'none' : '1px solid #b3d5eb'}
        textColor="white"
        disabled={!validCheck.nickName}
        backgroundColor={!validCheck.nickName ? 'gray' : '#79B0CB'}
        useHover={validCheck.nickName}
        useTransition={true}
        transitionDuration={0.3}
        hoverBackgroundColor="#3F82AC">
        저장
      </Button>
    </InputContainer>
  );
};

export default EditNicknameForm;
