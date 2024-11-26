import React from 'react'

const NoAuthPage = () => {
  return (
    <div style={{ textAlign: 'center', }}>
      <div style={{ fontSize: '30px', fontWeight: 'bold', margin: '50px 0' }}>
        관리자 전용 페이지 입니다.
      </div>
      <a href="/posts">사용자 홈 바로가기</a>
    </div>
  )
}

export default NoAuthPage
