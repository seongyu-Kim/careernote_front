import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: #f5f5f5;
    color: #4caf50;
  }

  .Toastify__toast--error {
    icon:none;
    background-color: #f5f5f5;
    color: #EC3333;
  }

`;
