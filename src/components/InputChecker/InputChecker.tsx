import * as Styled from '@styles/Authentication/Authentication.styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import apiUtils from '@utils/apiUtils';
import { USER_API } from '@routes/apiRoutes';
import { useValidCheck } from '@stores/useCheckDuplication';
import { Input, Button, InputErrorMessage, AuthenticationInput } from 'components';

interface InputCheckerProps {
  forValue?: string;
  inputTagType: string;
  placeholderText: string;
  onChange: (value: string) => void;
  valid: boolean;
  checkMessage: string;
  useCheckDuplication?: boolean;
  checkDuplicationType?: string;
  checkDuplicationValue?: string;
  errorMsg?: (value: string) => void;
}

interface CheckDuplicationProps {
  useCheck: boolean;
  dataType: string;
  value: string | undefined;
  valid: boolean;
  validCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  errorMsg?: (value: string) => void;
}

const InputChecker = ({
  forValue,
  inputTagType, //인풋 타입 ex) text
  placeholderText,
  onChange,
  valid, // 유효성 검사 boolean 값
  checkMessage, // 유효성 검사 확인 메시지
  useCheckDuplication = false, // 중복 검사 사용 여부
  checkDuplicationType = '', //이메일 닉네임 지정
  checkDuplicationValue, // 이거 따라서 중복 확인 요청 api 보내게
  errorMsg,
}: InputCheckerProps) => {
  const [duplicationCheck, setDuplicationCheck] = useState(false);
  const { setValidCheck } = useValidCheck();

  useEffect(() => {
    if (!useCheckDuplication) {
      return;
    }
    if (!valid) {
      setDuplicationCheck(false);
      return;
    }
    if (checkDuplicationType === 'nickname') {
      return setValidCheck('nickName', duplicationCheck);
    }
    return setValidCheck('email', duplicationCheck);
  }, [valid, duplicationCheck]);

  useEffect(() => {
    setDuplicationCheck(false);
  }, [checkDuplicationValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };
  if (useCheckDuplication) {
    return (
      <Styled.InputBoxContainer>
        <Styled.InputWrapper>
          <Styled.InputLabel>
            <AuthenticationInput
              forValue={forValue}
              type={inputTagType}
              labelPlaceHolder={placeholderText}
              onChange={handleInputChange}
            />
            {duplicationCheck && <FaRegCheckCircle className="checkIcon" />}
          </Styled.InputLabel>
          <CheckDuplication
            useCheck={useCheckDuplication}
            dataType={checkDuplicationType}
            value={checkDuplicationValue}
            valid={valid}
            validCheck={setDuplicationCheck}
            errorMsg={errorMsg}
          />
        </Styled.InputWrapper>
        <InputErrorMessage message={checkMessage} />
      </Styled.InputBoxContainer>
    );
  }
  return (
    <Styled.InputBoxContainer>
      <Styled.InputWrapper>
        <Styled.InputLabel>
          <AuthenticationInput
            forValue={forValue}
            type={inputTagType}
            labelPlaceHolder={placeholderText}
            onChange={handleInputChange}
          />
          {valid && <FaRegCheckCircle className="checkIcon" />}
        </Styled.InputLabel>
      </Styled.InputWrapper>
      <InputErrorMessage message={checkMessage} />
    </Styled.InputBoxContainer>
  );
};

const CheckDuplication = ({
  useCheck,
  dataType,
  value,
  valid,
  validCheck,
  errorMsg,
}: CheckDuplicationProps) => {
  if (!useCheck) {
    return null;
  }

  const { CHECK_DUPLICATION } = USER_API;
  const duplicationCheck = async (type: string) => {
    if (!value) {
      return;
    }
    const resData = value;
    try {
      const res = await apiUtils({
        url: CHECK_DUPLICATION,
        method: 'POST',
        data: type === 'nickname' ? { nickname: resData } : { email: resData },
        withAuth: false,
      });
      if (
        res.message === '사용가능한 닉네임 입니다' ||
        res.message === '사용가능한 이메일 입니다'
      ) {
        console.log('사용가능');
        return validCheck!(true);
      }
      // console.log('사용불가');
      // errorMsg!('사용불가');
      // return validCheck!(false);
    } catch (error) {
      errorMsg!('사용불가');
      validCheck!(false);
      console.log('중복 검사 오류', error);
    }
  };

  return (
    useCheck && (
      <Button
        onClick={() => duplicationCheck(dataType)}
        width="30%"
        height="40px"
        border={!valid ? 'none' : '1px solid #b3d5eb'}
        textColor={!valid ? 'white' : '#79b0c8'}
        disabled={!valid}
        backgroundColor={!valid ? 'gray' : 'white'}
        useHover={valid}
        useTransition={true}
        transitionDuration={0.5}>
        중복 확인
      </Button>
    )
  );
};

export default InputChecker;
