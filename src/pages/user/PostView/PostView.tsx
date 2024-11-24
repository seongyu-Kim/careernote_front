import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import { BOARD_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import apiUtils from '@utils/apiUtils';
import { useUserStore } from '@stores/userStore';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';

const { DETAILS_BOARD } = BOARD_API;

const PostView = () => {
  const { postId } = useParams();
  const { closeAlert } = useAlertStore();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
  // 게시글 삭제 (본인만 삭제 가능)
  const handleMyPostDelete = async (postId: string) => {
    try {
      // 서버 요청
      const response = await apiUtils({
        url: DETAILS_BOARD(postId),
        method: 'DELETE',
        // data: data
      });

      console.log('게시글 삭제 성공 응답 데이터:', response);
      SuccessToast(`게시글이 삭제되었습니다.`);

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
          onDelete={() => handleMyPostDelete(postId as string)}
        />
      </NavbarContainer>
    </>
  );
};

export default PostView;
