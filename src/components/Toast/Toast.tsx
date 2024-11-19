import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from './Toast.styled';

const Toast = () => {
  return (
    <StyledToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      limit={3}
    />
  );
};

export default Toast;
