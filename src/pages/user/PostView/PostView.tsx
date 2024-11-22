import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import { BOARD_API } from '@routes/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertStore } from '@stores/store';
import apiUtils from '@utils/apiUtils';
import { useUserStore } from '@stores/userStore';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';

const { CUD_BOARD } = BOARD_API;
const MAIN_PAGE_URL = ROUTE_LINK.MAIN.link;
const PostView = () => {
  const { postId } = useParams();
  const { closeAlert } = useAlertStore();
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const userLevelId = user?.level._id;
  const navigate = useNavigate();

  // 게시글 삭제 (본인만 삭제 가능)
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
          onDelete={() => handleDelete(postId as string)}
        />
      </NavbarContainer>
    </>
  );
};

export default PostView;
