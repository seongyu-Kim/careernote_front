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
`;

export const FindPasswordField = styled.div`
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
