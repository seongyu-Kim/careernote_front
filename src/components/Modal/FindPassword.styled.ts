import styled from 'styled-components';

export const FindPasswordBackground = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(179, 179, 179, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FindPasswordContainer = styled.div`
  width: 25%;
  height: 60%;
  border-radius: 9px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  .close {
    font-size: 2rem;
    color: grey;
    position: fixed;
    right: 38%;
    top: 21%;
  }
`;

export const FindPasswordField = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
  border-radius: 9px;
  margin-bottom: 10%;
  padding: 8px 0 10px 0;
`;

export const MainLogo = styled.img`
  width: 100px;
  position: absolute;
  left: 40%;
  top: 1.7%;
`;

export const FindPasswordText = styled.p`
  font-size: 0.8rem;
  margin-top: 50%;
  color: #3a5265;
`;

export const FindPasswordInput = styled.input`
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
export const FindPasswordForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
`;

export const Divider = styled.div`
  width: 100%;
  margin: 7%;
  position: relative;
`;

export const ErrorMessage = styled.p`
  color: #e25151;
  font-size: 14px;
  position: absolute;
  width: 100%;
  left: 20%;
  bottom: 25%;
  display: flex;
  align-content: center;
`;
