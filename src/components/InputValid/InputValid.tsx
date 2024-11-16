import * as Styled from '@components/Register/Register.styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React from 'react';
import DefaultInput from '@components/common/DefaultInput/DefaultInput';
import { InputBoxContainer } from '@components/Register/Register.styled';

interface InputValidProps {
  inputTagType: string;
  placeholderText: string;
  onChange: (value: string) => void;
  valid: boolean;
  checkMessage: string;
}

const InputValid = ({
  inputTagType,
  placeholderText,
  onChange,
  valid,
  checkMessage,
}: InputValidProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };
  return (
    <InputBoxContainer>
      <Styled.InputWrapper>
        <DefaultInput
          onChange={handleInputChange}
          type={inputTagType}
          placeholder={placeholderText}
          width="100%"
          height="40px"
          border="1px solid #b3d5eb"
          backgroundColor="#f0f7fb"
          caretColor="#79b0c8"
          padding="3%"
          placeholderColor="#79b0c8"
        />
        {valid && <FaRegCheckCircle className="checkIcon" />}
      </Styled.InputWrapper>
      <Styled.Divider>
        {checkMessage && (
          <Styled.InputFiledErrorMessage>
            <IoAlertCircleOutline />
            {checkMessage}
          </Styled.InputFiledErrorMessage>
        )}
      </Styled.Divider>
    </InputBoxContainer>
  );
};

export default InputValid;
