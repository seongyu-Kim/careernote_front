const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const USER_API = {
  ALL_USER: `${BASE_URL}/api/user/all`, // 모든 유저
  CHECK_DUPLICATION: `${BASE_URL}/api/user/checkDuplication`, // 중복검사
  SIGNUP: `${BASE_URL}/api/user/signUp`, // 회원가입
  UPDATE_INFO: `${BASE_URL}/api/user/updateInfo`, // 내 정보 수정
  LOGIN: `${BASE_URL}/api/user/login`, // 로그인
  LOGOUT: `${BASE_URL}/api/user/logout`, // 로그아웃
  REQUEST_RESET_PASSWORD: `${BASE_URL}/api/user/requestResetPassword`, //비밀번호 재설정 링크 요청
  RESET_PASSWORD: (token: string) => `${BASE_URL}/api/user/resetPassword/${token}`, // 비밀번호 재설정
  USER_DELETE: `${BASE_URL}/api/user`, // 유저 탈퇴
  USER_ABOUT: `${BASE_URL}/api/user/about`,
};

export const BOARD_API = {
  ALL_BOARD: `${BASE_URL}/api/board`, // 전체 게시글 목록 조회
  CATEGORY: (category: string) => `${BASE_URL}/api/board/category/${category}`, // 게시글 by 카테고리
  CUD_BOARD: `${BASE_URL}/api/board`, // 게시글 (CREATE,UPDATE,DELETE)
  DETAILS_BOARD: (id: string | number) => `${BASE_URL}/api/board/${id}`, // 게시물 상세 조회(READ)
};

export const NOTICE_API = {
  ALL_NOTICES: `${BASE_URL}/api/notice`, // 전체 공지 목록 조회
  CUD_NOTICE: `${BASE_URL}/api/notice`, // 공지 (CREATE,UPDATE,DELETE)
  DETAILS_BOARD: (id: string | number) => `${BASE_URL}/api/notice/${id}`, // 공지 상세 조회(READ)
};
//const response = await axios.get(BOARD_ROUTE_API.READ_BOARD(id)); 사용 예시
