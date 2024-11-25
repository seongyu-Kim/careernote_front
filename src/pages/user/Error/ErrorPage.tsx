import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ display: "flex", flexDirection :"column",justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
      <div style={{ fontSize: '30px', fontWeight: "bold" }}>
        잘못된 경로입니다.
      </div>
      <img src = "/404error.png" alt='notFondimg' style ={{margin : "20px", width : "1000px", height : "600px"}}/>
      <div style={{ fontSize: '25px', fontWeight: "bold", marginTop:"20px" }}>
        처음으로 돌아가세요
      </div>


    </div >
  )
};

export default ErrorPage;
