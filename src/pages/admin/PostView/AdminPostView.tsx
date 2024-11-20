import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { useAlertStore } from '@stores/store';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';
const { DETAILS_BOARD: DETAILS_NOTICE, CUD_NOTICE } = NOTICE_API;
const { DETAILS_BOARD, CUD_BOARD } = BOARD_API;
interface PostProps {
  title: string;
  content: string;
  category: string;
  date: string;
  writer: string;
  id: string;
}
const AdminPostView = () => {
  const ADMIN_MAIN = ROUTE_LINK.ADMIN_MAIN.link;
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
  const level = user?.level.name;
  const userLevelId = user?.level._id;
  const userId = user?.user_id
  const username = user?.nickName;
  // 공지 상세 조회
  useEffect(() => {
    console.log(user);
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
  // 공지 외 상세 조회
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
  // 게시글 삭제
  const handleDelete = async (postId: string) => {
    try {
      let url;
      let data;

      if (post.category === '공지') {
        // 공지 삭제 요청
        url = CUD_NOTICE;
        data = {
          notice_id: postId,
          user: userId,
        };
      } else {
        // 일반 게시글 삭제 요청
        url = CUD_BOARD;
        data = {
          board_id: postId,
          user: userId,
          level: userLevelId,
        };
      }

      // 서버 요청
      const response = await apiUtils({
        url,
        method: 'DELETE',
        data,
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
    navigate(ADMIN_MAIN);
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
