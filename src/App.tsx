import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyles from '@styles/Globalstyles';

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
