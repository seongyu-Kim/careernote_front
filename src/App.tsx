import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyles from '@styles/Globalstyles';
import { ModalPortal } from '@components/Modal/ModalPortal/ModalPortal';
import ModalView from '@components/Modal/ModalView/ModalView';
import Alert from '@components/Alert/Alert';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '@components/Toast/Toast';

function App() {
  return (
    <>
      <Toast />
      <Outlet />
      <ModalPortal>
        <ModalView />
      </ModalPortal>
      <Alert />
    </>
  );
}

export default App;
