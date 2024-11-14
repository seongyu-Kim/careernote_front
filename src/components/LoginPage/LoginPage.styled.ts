import styled from 'styled-components';

export const LoginPageBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  background-color: white;
`;

export const LoginField = styled.div`
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

export const LoginText = styled.p`
  font-size: 3.5rem;
  color: #3a5265;
`;

export const LoginForm = styled.form`
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
`;

export const LoginInput = styled.input`
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

export const FindPasswordBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  p {
    color: #325366;
    font-size: 14px;
    cursor: pointer;
  }
`;

export const LoginButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9%;
  width: 100%;
  height: 20%;
  margin-top: 10%;
`;
