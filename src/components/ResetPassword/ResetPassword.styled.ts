import styled from 'styled-components';

export const ResetPasswordPageBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

export const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  background-color: white;
`;

export const ResetPasswordField = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
  border-radius: 9px;
  padding: 10px 0 0 10px;
  box-shadow:
    2px 2px 11px 5px rgba(208, 208, 208, 0.3),
    -2px -2px 11px 2px rgba(208, 208, 208, 0.3),
    -2px 2px 11px 5px rgba(208, 208, 208, 0.3),
    2px -2px 11px 2px rgba(208, 208, 208, 0.3);
`;

export const MainLogo = styled.img`
  width: 100px;
`;

export const ResetPasswordText = styled.p`
  font-size: 2.5rem;
  color: #3a5265;
`;

export const ResetPasswordForm = styled.form`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
`;

export const InputBoxContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .checkIcon {
    display: flex;
    color: green;
    position: absolute;
    right: 3%;
  }
`;

export const ResetPasswordInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #b3d5eb;
  border-radius: 9px;
  outline: none;
  background-color: #f0f7fb;
  caret-color: #79b0c8;
  padding: 3%;
  &::placeholder {
    color: #79b0c8;
  }
`;

export const ResetPasswordButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9%;
  width: 100%;
  height: 20%;
  margin-top: 10%;
`;

export const Divider = styled.div`
  width: 100%;
  margin: 7%;
  position: relative;
`;

export const InputFiledErrorMessage = styled.p`
  color: #e25151;
  font-size: 14px;
  position: absolute;
  width: 100%;
  bottom: 25%;
  left: -7%;
  display: flex;
`;

export const PasswordErrorMessage = styled.p`
  color: #e25151;
  font-size: 14px;
  position: absolute;
  width: 100%;
  left: 20%;
  bottom: 25%;
  display: flex;
  align-content: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;
