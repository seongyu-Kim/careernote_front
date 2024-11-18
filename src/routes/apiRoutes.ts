export const USER_API = {
  ALL_USER: '/api/user/all', // 모든 유저
  CHECK_DUPLICATION: '/api/user/checkDuplication', // 중복검사
  SIGNUP: '/api/user/signUp', // 회원가입
  UPDATE_INFO: '/api/user/updateInfo', // 내 정보 수정
  LOGIN: '/api/user/login', // 로그인
  LOGOUT: '/api/user/logout', // 로그아웃
  REQUEST_RESET_PASSWORD: '/api/user/requestResetPassword', //비밀번호 재설정 링크 요청
  RESET_PASSWORD: '/api/user/resetPassword', // 비밀번호 재설정
  USER_DELETE: '/api/user/delete', // 유저 탈퇴
};

export const COMMON_API = {
  CREATE_NOTICE: '/api/board', // 공지 생성
  READ_NOTICE: (id: string | number) => `/api/board/${id}`, // 공지 세부 사항
  UPDATE_NOTICE: (id: string | number) => `/api/board/${id}`, // 공지 수정
  DELETE_NOTICE: (id: string | number) => `/api/board/${id}`, // 공지 삭제
};

export const BOARD_API = {
  ALL_BOARD: '/api/board',
  CATEGORY: (category: string) => `/api/board/category/${category}`, // 게시글 by 카테고리
};

export const NOTICE_API = {
  ALL_NOTICES: '/api/notice',
};

//const response = await axios.get(BOARD_ROUTE_API.READ_BOARD(id)); 사용 예시
