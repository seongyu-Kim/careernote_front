import * as Styled from '@components/common/Authentication/Authentication.styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React from 'react';
import DefaultInput from '@components/common/DefaultInput/DefaultInput';
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
    const resData = checkDuplicationValue;
    try {
      const res = await apiUtils({
        url: `http://kdt-react-1-team01.elicecoding.com:3002${CHECK_DUPLICATION}`,
        data: type === 'nickname' ? { nickname: resData } : { email: resData },
        withAuth: false,
      });
      console.log(resData);
      console.log(res);
      if (res.message === '사용 가능한 닉네임과 이메일 입니다') {
        console.log('사용가능!');
      }
    } catch (error) {
      console.log('중복 검사 오류', error);
    }
  };

  return (
    <Styled.InputBoxContainer>
      <Styled.InputWrapper>
        <Styled.InputLabel>
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
        </Styled.InputLabel>
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
          <Styled.ErrorMessage>
            <IoAlertCircleOutline />
            {checkMessage}
          </Styled.ErrorMessage>
        )}
      </Styled.Divider>
    </Styled.InputBoxContainer>
  );
};

export default InputValid;
