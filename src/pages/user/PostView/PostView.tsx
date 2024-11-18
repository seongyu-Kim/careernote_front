import NavbarContainer from '@components/NavbarContainer/NavbarContainer';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import React, { useEffect, useState } from 'react';
import { COMMON_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import apiUtils from '@utils/apiUtils';
import { useUserStore } from '@stores/userStore';
const { READ_NOTICE, DELETE_NOTICE } = COMMON_API;
interface PostProps {
  title: string;
  content: string;
  category: string;
  date: string;
  writer: string;
  id: string;
}
const PostView: React.FC = () => {
  const { postId } = useParams();
  const { closeAlert } = useAlertStore();
  const user = useUserStore((state) => state.user?.nickName as string);
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps>({
    title: '제목',
    content: '내용',
    category: '취업정보',
    date: '2023-03-21',
    writer: '리온이누나',
    id: '',
  }); // api 준비되면 빈 값으로 교체

  useEffect(() => {
    console.log(user);
    if (!postId) {
      console.error('해당 postId가 없습니다.');
      return;
    }
    const fetchPostDetails = async () => {
      try {
        const response = await apiUtils({
          url: READ_NOTICE(postId),
          method: 'GET',
        });

        console.log('서버 응답 데이터:', response);
        setPost(response.data);
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
        url: DELETE_NOTICE(postId),
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
          user={user} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
          onDelete={() => handleDelete(postId as string)}
        />
      </NavbarContainer>
    </>
  );
};

export default PostView;
