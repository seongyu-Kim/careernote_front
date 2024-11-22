import { NavbarContainer } from 'components';
import PostCard from '@pages/admin/PostView/PostCard/PostCard';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { useAlertStore } from '@stores/store';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const location = useLocation();
  const { category } = location.state || {};
  const { closeAlert } = useAlertStore();
  const navigate = useNavigate();

  // userStore에서 로그인 사용자 정보 가져오기
  const user = useUserStore((state) => state.user);
  const userLevelId = user?.level._id;
  const userId = user?.user_id


  // 게시글 삭제 (모든 회원의 글 삭제 가능)
  const handleDelete = async (postId: string) => {
    try {
      let url;
      let data;

      if (category === '공지') {
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
          onDelete={() => handleDelete(postId as string)}
        />
      </NavbarContainer>
    </div>
  );
};

export default AdminPostView;
