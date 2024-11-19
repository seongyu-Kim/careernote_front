import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import React, { useEffect, useState } from 'react';
import { BOARD_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import apiUtils from '@utils/apiUtils';
import { useUserStore } from '@stores/userStore';
const { DETAILS_BOARD } = BOARD_API;
interface PostProps {
  title: string;
  content: string;
  category: string;
  date: string;
  writer: string;
  id: string;
}
const PostView = () => {
  const { postId } = useParams();
  const { closeAlert } = useAlertStore();
  const userName = useUserStore((state) => state.user?.nickName);
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps>({
    title: '',
    content: '',
    category: '',
    date: '',
    writer: '',
    id: '',
  }); // api 준비되면 빈 값으로 교체

  useEffect(() => {
    if (!postId) {
      console.error('해당 postId가 없습니다.');
      return;
    }
    const fetchPostDetails = async () => {
      try {
        const response = await apiUtils({
          url: DETAILS_BOARD(postId),
          method: 'GET',
        });

        console.log('서버 응답 데이터:', response);
        // 서버에서 받은 데이터를 가공
        const updatedPost: PostProps = {
          ...response,
          date: new Date(response.updatedAt).toLocaleString(),
          writer: response.user.nickname
        };
        setPost(updatedPost);
      } catch (error) {
        console.error('게시글 상세 조회 요청 실패:', error);
      }
    };
    fetchPostDetails();
  }, [postId]);

  const handleDelete = async (postId: string) => {
    try {
      // 서버 요청
      const response = await apiUtils({
        url: DETAILS_BOARD(postId),
        method: 'DELETE',
      });
      if (response.status === 200) {
        console.log('게시글 삭제 성공 응답 데이터:', response);
        alert(`게시글 ${postId} 삭제되었습니다.`);
      }
    } catch (error) {
      console.error('게시글 삭제 요청 실패:', error);
    }
    closeAlert();
    navigate('/posts');
  };

  return (
    <>
      <NavbarContainer>
        <PostCard
          post={post}
          user={userName} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
          onDelete={() => handleDelete(postId as string)}
        />
      </NavbarContainer>
    </>
  );
};

export default PostView;
