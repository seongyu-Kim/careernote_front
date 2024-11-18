import * as Styled from '@components/Register/Register.styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React from 'react';
import DefaultInput from '@components/common/DefaultInput/DefaultInput';
import { InputBoxContainer } from '@components/Register/Register.styled';
import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import apiUtils from '@utils/apiUtils';
import { USER_API } from '@routes/apiRoutes';

interface InputValidProps {
  inputTagType: string;
  placeholderText: string;
  onChange: (value: string) => void;
  valid: boolean;
  checkMessage: string;
  useCheckDuplication?: boolean;
  checkDuplicationType?: string;
  checkDuplicationValue?: string;
}

const InputValid = ({
  inputTagType,
  placeholderText,
  onChange,
  valid,
  checkMessage,
  useCheckDuplication = false, // 중복 검사 사용 여부
  checkDuplicationType = '', //이메일 닉네임 지정
  checkDuplicationValue, // 이거 따라서 중복 확인 요청 api 보내게
}: InputValidProps) => {
  const { CHECK_DUPLICATION } = USER_API;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };
  const checkDuplicationCheck = async (type: string) => {
    if (!type) {
      return;
    }
    try {
      const res = await apiUtils({
        url: `http://kdt-react-1-team01.elicecoding.com:3002${CHECK_DUPLICATION}`,
        data:
          type === 'nickname'
            ? { nickname: checkDuplicationValue }
            : { email: checkDuplicationValue },
        withAuth: false,
      });
      console.log(res);
      if (res.message === '사용 가능한 닉네임과 이메일 입니다') {
        console.log('사용가능!');
      }
    } catch (error) {
      console.log('중복 검사 오류', error);
    }
  };

  return (
    <InputBoxContainer>
      <Styled.InputWrapper>
        <Styled.inputLabel>
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
        </Styled.inputLabel>
        {useCheckDuplication && (
          <DefaultButton
            onClick={() => checkDuplicationCheck(checkDuplicationType)}
            width="30%"
            height="40px"
            border="1px solid #b3d5eb"
            textColor="#79b0c8">
            중복 확인
          </DefaultButton>
        )}
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
