# CAREERNOTE
<div align="center">
  <img width="45%" alt="스크린샷 2025-02-19 오후 5 12 37" src="https://github.com/user-attachments/assets/14ecbb52-5594-4669-8143-91cc306c6f66" />
</div>

<br />

## 1. 팀 소개
**팀명** : 1팀 뭐라도하겠지

**팀원** : 박주호(팀장), 이주영, 김선규, 조아라, 하정우

<br />

## 2. 기획내용
**프로젝트 주제** : 커뮤니티 웹 서비스

**프로젝트 기간** : 2024년 11월 12일 ~ 2024년 11월 25일

**프로젝트 인원** : 5명

**프로젝트 소개** : 면접 경험, 취업 정보, 채용 공고 등 다영한 취업 관련 정보를 공유하는 취준생 대상 플랫폼

<br/>

**기술 스택** :  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" /> <img src="https://img.shields.io/badge/Zustand-3578E5.svg?style=for-the-badge&logo=Zustand&logoColor=white" /> 

<br />

## 3. 역할 분담
| **팀원**            | **역할**                                                                 |
|---------------------|--------------------------------------------------------------------------|
| **박주호 (Front)**  | 로그인/회원가입, 비밀번호 찾기, 비밀번호 재설정, 내 정보 수정                                               |
| **이주영 (Front)**  | 상세페이지, 댓글, 사용자 관리                                                 |
| **김선규 (Front)**  | 메인페이지, 네비게이션/사이드바, 페이지네이션, 게시판 카테고리 추가/삭제                              |
| **조아라 (Back)**   | 유저 API                      |
| **하정우 (Back)**   | 게시판 API, 공지 API, 카테고리 API, 댓글 API                                    |

<br />

## 4. 구현기능
##### 로그인 및 회원가입
- 로그인 : 사용자의 입력 값 유효성 검사
- 회원가입 : 사용자의 이메일, 아이디, 닉네임 중복 검사 및 유효성 검사
- 비밀번호 재설정 : 이메일 유효성 검사 및 가입 이메일로 비밀번호 재설정 메일 발송

##### 사이드바 및 상단바
- 사이드바 : 카테고리 선택 시 해당하는 게시물만 필터링, 비밀번호 입력 후 내 정보 수정, 회원탈퇴
- 상단바 : 비로그인 시 로그인 버튼 표시, 로그인 시 사용자 닉네임과 로그아웃 버튼 표시

##### 메인페이지
- 게시글 테이블: 공지와 공지 외 게시글로 분류해서 표시, 공지 숨기기 버튼, 글쓰기 버튼, 페이지네이션

##### 게시글 상세보기
- 게시글 등록: 회원 등급에 따라 작성 가능한 카테고리 제한
- 게시글 수정/삭제: 본인일 경우에만 수정, 삭제 가능 
- 댓글: 본인이 작성한 댓글만 수정, 삭제 가능
  
##### 관리자 페이지
- 사용자 관리: DnD로 사용자 등급 변경
- 카테고리 관리: 게시판 카테고리 추가/삭제, 해당 카테고리의 게시글이 없어야만 카테고리 삭제 가능
- 게시판 관리: 관리자 공지 등록/수정/삭제, 사용자 게시글 삭제, 사용자 댓글 삭제


<br />

## 5. 보완할 점 & 추후 개발하고자 하는부분
- 카테고리를 선택할 때 마다 API를 호출하기 때문에 API호출이 너무 많이 발생함. 게시글을 캐싱해두었다가 카테고리에 따라 보여주면 API호출을 줄을 수 있을 것 같음
- 비회원일 경우 컨텐츠 접근을 과도하게 제한함. UX를 조금 더 고려할 필요가 있음
- 사이트 접속 시 /post로 리다이렉트 되는데 이는 추가적인 요청이 발생하는 것이기 때문에 루트 경로에서 /post 페이지가 보이게 할 필요가 있음

<br />

## 시연영상
https://www.youtube.com/watch?v=wGmRV-elPxM
