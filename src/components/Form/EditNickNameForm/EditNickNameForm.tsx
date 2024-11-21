import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import { useState } from "react";
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditNicknameForm = ({ onSave }: { onSave: (nickname: string) => void }) => {
  const [nickname, setNickname] = useState('');

  const handleSave = () => {
    onSave(nickname);
    setNickname('');
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="새 닉네임을 입력하세요"
      />
      <Button onClick={handleSave}>저장</Button>
    </InputContainer>
  );
};

export default EditNicknameForm;