import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import React, { useEffect, useState } from 'react';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import apiUtils from '@utils/apiUtils';
import { useUserStore } from '@stores/userStore';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';

const { DETAILS_BOARD, CUD_BOARD } = BOARD_API;
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
  const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
  const { postId } = useParams();
  const { closeAlert } = useAlertStore();
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const userLevelId = user?.level._id;
  const userName = useUserStore((state) => state.user?.nickName);
  const userLevel = useUserStore((state) => state.user?.level.name);
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
        // 공지 API 시도
        const noticeResponse = await apiUtils({
          url: DETAILS_NOTICE(postId),
          method: 'GET',
        });

        console.log('공지 상세 데이터:', noticeResponse);

        const updatedPost: PostProps = {
          ...noticeResponse,
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
    const data = {
      "board_id": postId,
      "user": userId,
      "level": userLevelId
    }
    try {
      // 서버 요청
      const response = await apiUtils({
        url: CUD_BOARD,
        method: 'DELETE',
        data: data
      });
      if (response.status === 200 || 201) {
        console.log('게시글 삭제 성공 응답 데이터:', response);
        SuccessToast(`게시글이 삭제되었습니다.`);
      }
    } catch (error) {
      console.error('게시글 삭제 요청 실패:', error);
      ErrorToast('다시 시도해주세요.')
    }
    closeAlert();
    navigate(MAIN_PAGE_URL);
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
