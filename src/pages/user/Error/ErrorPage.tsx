import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LINK } from '@routes/routes';

const ErrorPage = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const MAIN = ROUTE_LINK.MAIN.link;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1); // 1초씩 감소
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
      navigate(MAIN);
    }
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <div style={{ fontSize: '30px', fontWeight: 'bold' }}>잘못된 경로입니다.</div>
      <img src="/404error.png" alt="notFondimg" style={{ margin: '20px', width: '500px' }} />
      <div style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '20px' }}>
        {count}초후 메인화면으로 이동합니다
      </div>
    </div>
  );
};

export default ErrorPage;
