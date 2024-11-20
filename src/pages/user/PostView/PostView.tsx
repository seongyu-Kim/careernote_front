import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import React, { useEffect, useState } from 'react';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import apiUtils from '@utils/apiUtils';
import { useUserStore } from '@stores/userStore';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';

const { DETAILS_BOARD } = BOARD_API;
const { DETAILS_BOARD: DETAILS_NOTICE } = NOTICE_API;

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
  //const userName = useUserStore((state) => state.user?.nickName);
  const userName = '닉넴';
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps>({
    title: '',
    content: '',
    category: '',
    date: '',
    writer: '',
    id: '',
  });
  // 공지 상세 조회
  useEffect(() => {
    if (!postId) {
      console.error('해당 postId가 없습니다.');
      return;
    }
    const fetchPostDetails = async () => {
      try {
        const response = await apiUtils({
          url: DETAILS_NOTICE(postId),
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
  // 공지 외 상세조회
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

        const updatedPost: PostProps = {
          id: response._id,
          title: response.title,
          content: response.content,
          category: response.category.name,
          writer: response.user.nickname,
          date: new Date(response.updatedAt).toLocaleString(),
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
      if (response.status === 200 || 201) {
        console.log('게시글 삭제 성공 응답 데이터:', response);
        SuccessToast(`게시글 ${postId} 삭제되었습니다.`);
      }
    } catch (error) {
      console.error('게시글 삭제 요청 실패:', error);
      ErrorToast('다시 시도해주세요.')
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
