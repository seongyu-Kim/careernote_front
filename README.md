# CARRERNOTE
> **📖 설명**
> - 면접 경험, 취업 정보, 채용 공고 등 다영한 취업 관련 정보를 공유하는 플랫폼

<div align="center">
  <img src="https://github.com/user-attachments/assets/d90b1b38-645f-4cea-8c8b-c8e1d55e5385" alt="포스터" width="500" />
</div>

> **기술 스택**
> - <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" /> <img src="https://img.shields.io/badge/Zustand-3578E5.svg?style=for-the-badge&logo=Zustand&logoColor=white" />

> **개발 인원(역할)**
> - FE 3/ BE 2(관리자 애플리케이션 프론트엔드 개발)

> **개발 기간**
>  - 2023.11 ~ 2023.11

<br>

### 💁‍♂️ 주요 업무 및 상세 역할
- React hooks를 이용한 상태관리
- zustand의 구독 범위를 최소화한 전역 상태관리
- TypeScript를 사용한 정적 타입 분석
- 페이지네이션 로직을 구현하여 데이터를 효율적으로 처리
- 메인페이지(네비게이션, 게시글 테이블, 페이지네이션 등), 카테고리 추가/삭제, 마이페이지(내가 쓴 글), 회원탈퇴 등

<br>

### 💡 느낀 점
- 전역 상태 관리
    Zutand를 처음 사용해보면서 사용법이 간단하고 React 컴포넌트의 의존성을 최소화할 수 있어, 기존에 사용해봤던 Context API, Recoil과 비교했을 때 더 효율적으로 전역 상태를 관리할 수 있었습니다.
    하지만, 상태를 구독하는 범위와 전역 상태로 관리해야할 데이터를 명확히 정의하지 않아 초기 설계에서 일부 비효율적인 코드가 발생했습니다. 이후 구독 범위를 필요한 컴포넌트로만 제한하고 상태를 세분화하면서 문제를 해결했지만, 초기 설계의 중요성을 다시 한 번 깨달았습니다.
    

- 사용자 경험에 대한 개선
    로그아웃 후에도 페이지네이션의 이전 상태가 유지되는 문제를 발견하고 수정하며, 사용자 경험을 중심으로 로직을 설계하는 방식이 더욱 중요하다고 생각하게 되었습니다. 사용자 흐름을 중심으로 코드를 설계하고, 예상하지 못한 사용자 행동에도 자연스럽게 대응할 수 있는 시스템을 만들고자 합니다.
 
<br>



