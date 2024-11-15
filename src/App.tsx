import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyles from '@styles/Globalstyles';
import { ModalPortal } from '@components/Modal/ModalPortal/ModalPortal';
import ModalView from '@components/Modal/ModalView/ModalView';

function App() {
  return (
    <>
      <Outlet />
      <ModalPortal>
        <ModalView />
      </ModalPortal>
    </>
  );
}

export default App;
