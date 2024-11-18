import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyles from '@styles/Globalstyles';
import { ModalPortal } from '@components/common/Modal/ModalPortal/ModalPortal';
import ModalView from '@components/common/Modal/ModalView/ModalView';
import Alert from '@components/common/Alert/Alert';

function App() {
  return (
    <>
      <Outlet />
      <ModalPortal>
        <ModalView />
      </ModalPortal>
      <Alert />
    </>
  );
}

export default App;
