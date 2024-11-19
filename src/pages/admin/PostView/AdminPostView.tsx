import NavbarContainer from '@components/NavbarContainer/NavbarContainer';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import { NOTICE_API } from '@routes/apiRoutes';
import { useAlertStore } from '@stores/store';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const { DETAILS_BOARD } = NOTICE_API;
interface PostProps {
  title: string;
  content: string;
  category: string;
  date: string;
  writer: string;
  id: string;
}
const AdminPostView = () => {
  const { postId } = useParams();
  const { openAlert, closeAlert } = useAlertStore();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    date: '',
    writer: '',
    id: '',
  });
  // userStore에서 로그인 사용자 정보 가져오기
  const user = useUserStore((state) => state.user);
  const level = user?.levelName;
  const username = user?.nickName;

  useEffect(() => {
    console.log(user);
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
          writer: '관리자'
        };
        setPost(updatedPost);
      } catch (error) {
        console.error('게시글 상세 조회 요청 실패:', error);
      }
    };
    fetchPostDetails();
  }, [postId]);

  const handleDelete = (postId: string) => {
    console.log(`게시글 ${postId}이 삭제되었습니다.`);
    // 삭제 API 호출 (postId를 이용)
    closeAlert();
    navigate('/admin');
  };
  return (
    <div>
      <NavbarContainer>
        <PostCard
          post={post}
          user={username} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
          level={level}
          onDelete={() => handleDelete(post.id)}
        />
      </NavbarContainer>
    </div>
  );
};

export default AdminPostView;
