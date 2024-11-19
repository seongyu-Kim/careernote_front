import * as Styled from '@styles/Authentication/Authentication.styled';
import { IoAlertCircleOutline } from 'react-icons/io5';
import React from 'react';

interface InputErrorMessageProps {
  message: string;
  confirm?: boolean;
}

const InputErrorMessage = ({ message, confirm = false }: InputErrorMessageProps) => {
  if (confirm) {
    return (
      <Styled.Divider tabIndex={-1}>
        {message && (
          <Styled.PasswordErrorMessage>
            <IoAlertCircleOutline />
            {message}
          </Styled.PasswordErrorMessage>
        )}
      </Styled.Divider>
    );
  }
  return (
    <Styled.Divider tabIndex={-1}>
      {message && (
        <Styled.ErrorMessage tabIndex={-1}>
          <IoAlertCircleOutline />
          {message}
        </Styled.ErrorMessage>
      )}
    </Styled.Divider>
  );
};

export default InputErrorMessage;
