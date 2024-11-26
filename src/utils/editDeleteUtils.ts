import { BOARD_COMMENT_API, NOTICE_COMMENT_API } from "@routes/apiRoutes";
import apiUtils from "./apiUtils";
import { ErrorToast, SuccessToast } from "./ToastUtils";
const { BOARD_COMMENTS } = BOARD_COMMENT_API;
const { NOTICE_COMMENTS } = NOTICE_COMMENT_API;

export const commentApiUtils = async (
  id: string,
  method: 'PUT' | 'DELETE'| 'POST',
  category: string,
  data?: Record<string, any>
) => {
  const url = category === '공지' ? NOTICE_COMMENTS(id) : BOARD_COMMENTS(id);

  try {
    const response = await apiUtils({ url, method, data });
    const action = method === 'PUT' ? '수정' : method === 'DELETE' ? '삭제' : '등록';
    console.log(`댓글 ${action} 성공`, response);
    SuccessToast(`댓글이 ${action}되었습니다.`);

  return response;
} catch (error) {
    const action = method === 'PUT' ? '수정' : method === 'DELETE' ? '삭제' : '등록';
    console.error(`댓글 ${action} 실패`, error);
    ErrorToast(`댓글 ${action}에 실패했습니다. 다시 시도해주세요.`);
    throw error;
}
};