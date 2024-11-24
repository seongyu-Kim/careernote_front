import styled from 'styled-components';
import { FaR } from 'react-icons/fa6';

interface Props {
  height?: string;
  fontSize?: string;
}

export const PageBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;
//모달 백그라운드
export const ModalBackground = styled.div`
  z-index: 200;
  width: 100%;
  height: 100vh;
  background: rgba(179, 179, 179, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
//모달 박스
export const ModalContainer = styled.div`
  z-index: 4;
  width: 450px;
  height: 570px;
  border-radius: 9px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  .close {
    font-size: 2rem;
    color: grey;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height || 'auto'};
  background-color: white;
`;

export const Field = styled.div<Props>`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10%;
  border-radius: 9px;
  padding: 10px 0 10px 0;
  box-shadow:
    2px 2px 11px 5px rgba(208, 208, 208, 0.3),
    -2px -2px 11px 2px rgba(208, 208, 208, 0.3),
    -2px 2px 11px 5px rgba(208, 208, 208, 0.3),
    2px -2px 11px 2px rgba(208, 208, 208, 0.3);
`;

export const ModalField = styled(Field)`
  width: 100%;
  height: 100%;
  padding: 8px 0 10px 0;
  box-shadow: none;
`;

export const MainLogo = styled.img`
  width: 100px;
`;

export const Text = styled.p<Props>`
  font-size: ${(props) => props.fontSize || '3.5rem'};
  color: #3a5265;
`;

export const TextContainer = styled.div`
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .myInfoIcon {
    color: #3a5265;
    cursor: pointer;
  }
`;

export const Form = styled.form`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
`;
export const MyInfoForm = styled(Form)`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//기본
export const InputBoxContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const LoginInputBoxContainer = styled(InputBoxContainer)`
  gap: 20px;
`;
export const CurrentPasswordMyInfoContainer = styled(InputBoxContainer)`
  width: 80%;
  align-items: center;
  gap: 50px;
`;

export const FindPasswordBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  span {
    color: #325366;
    font-size: 14px;
    cursor: pointer;
  }
`;

//기본 버튼 박스
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9%;
  width: 100%;
  height: 20%;
  margin: 10% 0 0 0;
`;
// 회원가입 컨테이너
export const RegisterButtonContainer = styled(ButtonContainer)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 0 0 10% 0;
`;
//내 정보 버튼 컨테이너
export const MyInfoButtonContainer = styled(ButtonContainer)`
  margin: 0;
`;
//비밀 번호 재설정 컨테이너
export const PasswordButtonContainer = styled(ButtonContainer)`
  margin: 10% 0 8% 0;
`;
//비밀번호 찾기 컨테이너
export const FindPasswordButtonContainer = styled(ButtonContainer)`
  align-items: center;
`;
export const Divider = styled.div`
  width: 100%;
  margin: 7%;
  position: relative;
`;
export const MyInfoDivider = styled(Divider)`
  margin: 5% 0 0 0;
`;

export const ErrorMessage = styled.p`
  color: #e25151;
  font-size: 14px;
  position: absolute;
  width: 100%;
  bottom: 25%;
  left: -7%;
  display: flex;
  align-items: center;
`;

export const PasswordErrorMessage = styled.p`
  color: #e25151;
  font-size: 14px;
  position: absolute;
  width: 100%;
  left: -5%;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3%;
`;

export const InputLabel = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
  .checkIcon {
    display: flex;
    color: green;
    position: absolute;
    right: 3%;
  }
`;
