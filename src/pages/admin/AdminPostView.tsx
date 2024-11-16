import MainLayout from '@components/MainLayout/MainLayout'
import PostCard from '@components/PostCard/PostCard'
import { useAlertStore } from '@stores/store';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AdminPostView = () => {
  const { postId } = useParams();
  const { openAlert, closeAlert } = useAlertStore();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '제목',
    content: '내용',
    category: '카테고리',
    date: '날짜',
    writer: '리오니',
    id: '1'
  });
  const user = '이주영'; // 유저 상태관리에서 가져오기?
  const level = '관리자';  // 유저 상태관리에서 가져오기?
  const handleDelete = (postId: string) => {
    console.log(`게시글 ${postId}이 삭제되었습니다.`);
    // 삭제 API 호출 (postId를 이용)
    closeAlert();
    navigate('/admin');
  };
  return (
    <div>
      <MainLayout>
        <PostCard
          post={post}
          user={user} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
          level={level}
          onDelete={() => handleDelete(post.id)}
        />
      </MainLayout>
    </div>
  )
}

export default AdminPostView
