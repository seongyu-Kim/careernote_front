const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const USER_API = {
  ALL_USER: `${BASE_URL}/api/user/all`, // 모든 유저
  CHECK_DUPLICATION: `${BASE_URL}/api/user/checkDuplication`, // 중복검사
  SIGNUP: `${BASE_URL}/api/user/signUp`, // 회원가입
  UPDATE_INFO: `${BASE_URL}/api/user/updateInfo`, // 내 정보 수정
  LOGIN: `${BASE_URL}/api/user/login`, // 로그인
  LOGOUT: `${BASE_URL}/api/user/logout`, // 로그아웃
  REQUEST_RESET_PASSWORD: `${BASE_URL}/api/user/requestResetPassword`, //비밀번호 재설정 링크 요청
  RESET_PASSWORD: `${BASE_URL}/api/user/resetPassword`, // 비밀번호 재설정
  USER_DELETE: `${BASE_URL}/api/user/delete`, // 유저 탈퇴
};

export const COMMON_API = {
  CREATE_NOTICE: `${BASE_URL}/api/board`, // 공지 생성
  READ_NOTICE: (id: string | number) => `${BASE_URL}/api/board/${id}`, // 공지 세부 사항
  UPDATE_NOTICE: (id: string | number) => `${BASE_URL}/api/board/${id}`, // 공지 수정
  DELETE_NOTICE: (id: string | number) => `${BASE_URL}/api/board/${id}`, // 공지 삭제
};

export const BOARD_API = {
  ALL_BOARD: `${BASE_URL}/api/board`,
  CATEGORY: (category: string) => `${BASE_URL}/api/board/category/${category}`, // 게시글 by 카테고리
};

export const NOTICE_API = {
  ALL_NOTICES: `${BASE_URL}/api/notice`,
};
//const response = await axios.get(BOARD_ROUTE_API.READ_BOARD(id)); 사용 예시
