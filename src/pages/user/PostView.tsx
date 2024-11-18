import authApi from '@apis/authApi/authApi';
import MainLayout from '@components/MainLayout/MainLayout';
import PostCard from '@components/PostCard/PostCard';
import React, { useEffect, useState } from 'react';
import { COMMON_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
const { READ_NOTICE } = COMMON_API;

const PostView: React.FC = () => {
  const { postId } = useParams();
  const { closeAlert } = useAlertStore();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '제목',
    content: '내용',
    category: '카테고리',
    date: '날짜',
    writer: '리오니',
    id: '1'
  });

  // useEffect(() => {
  //   if (!postId) {
  //     console.error('해당 postId가 없습니다.');
  //     return;
  //   }
  //   const fetchPostDetails = async () => {
  //     try {
  //       const res = await authApi.get(READ_NOTICE(postId));
  //       if (res.status === 200) {
  //         const { title, content, category, date, writer } = res.data;
  //         setPost({ title, content, category, date, writer });
  //       }
  //     } catch (error) {
  //       console.error('게시물 불러오기 에러:', error);
  //       alert('게시물을 불러오는 중 오류가 발생했습니다.');
  //     }
  //   };

  //   fetchPostDetails();
  // }, [postId]); 

  const user = '리오니'; // 유저 상태관리에서 가져오기?

  const handleDelete = (postId: string) => {
    alert(`게시글 ${postId}이 삭제되었습니다.`); //tostify
    // 삭제 API 호출 (postId를 이용)
    closeAlert();
    navigate('/posts');
  };

  return (
    <>
      <MainLayout>
        <PostCard
          post={post}
          user={user} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
          onDelete={() => handleDelete(post.id)}
        />
      </MainLayout>
    </>
  );
};

export default PostView;
