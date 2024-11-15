import MainLayout from '@components/MainLayout/MainLayout'
import PostCard from '@components/PostCard/PostCard'
import { useAlertStore } from '@stores/store'
import React from 'react'

const AdminPostView = () => {
  // api 호출해서 PostCard 컴포넌트에 넘기는 부분 추가
  const user = '이주영'; // 유저 상태관리에서 가져오기?
  const level = '관리자';  // 유저 상태관리에서 가져오기?
  const { isOpen, message, openModal, closeModal } = useAlertStore();
  return (
    <div>
      <MainLayout>
        <PostCard
          category="취업"
          title="제목입니다~"
          writer="리오니"
          date="2024.11.03"
          content="content 입니다. content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다"
          user={user} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
          isOpen={isOpen}  // 모달의 열림 여부 전달
          message={message}  // 모달에 표시할 메시지 전달
          openModal={openModal}  // 모달 열기 함수 전달
          closeModal={closeModal}  // 모달 닫기 함수 전달
          level={level} // 등급 전달
        />
      </MainLayout>
    </div>
  )
}

export default AdminPostView
