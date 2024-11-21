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
  const levelName = user?.level.name;
  const userLevelId = user?.level._id;
  const userId = user?.user_id
  const username = user?.nickName;
  // 공지 상세 조회
  useEffect(() => {
    if (!postId) {
      console.error('해당 postId가 없습니다.');
      return;
    }

    const fetchPostDetails = async () => {
      try {
        // 공지 API 시도
        const noticeResponse = await apiUtils({
          url: DETAILS_NOTICE(postId),
          method: 'GET',
        });

        console.log('공지 상세 데이터:', noticeResponse);

        const updatedPost: PostProps = {
          ...noticeResponse,
          id: noticeResponse._id,
          date: new Date(noticeResponse.updatedAt).toLocaleString(),
          writer: '관리자',
          category: '공지'
        };
        setPost(updatedPost);
      } catch (noticeError) {
        console.warn('공지 API 실패, 일반 게시글 API 시도:', noticeError);

        try {
          // 공지 API 실패 시 일반 게시글 API 호출
          const boardResponse = await apiUtils({
            url: DETAILS_BOARD(postId),
            method: 'GET',
          });

          console.log('게시글 상세 데이터:', boardResponse);

          const updatedPost: PostProps = {
            id: boardResponse._id,
            title: boardResponse.title,
            content: boardResponse.content,
            category: boardResponse.category?.name || '알 수 없음',
            writer: boardResponse.user?.nickname || '알 수 없는 사용자',
            date: new Date(boardResponse.updatedAt).toLocaleString(),
          };
          setPost(updatedPost);

        } catch (boardError) {
          console.error('게시글 상세 조회 실패:', boardError);
        }
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

      console.log('게시글 삭제 성공 응답 데이터:', response);
      SuccessToast(`게시글 삭제되었습니다.`);

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
          level={levelName}
          onDelete={() => handleDelete(post.id)}
        />
      </NavbarContainer>
    </div>
  );
};

export default AdminPostView;
