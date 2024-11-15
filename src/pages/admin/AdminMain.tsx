import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import Alert from '@components/common/Alert/Alert';
import Pagination from '@components/Pagination/Pagination';
import PostList from '@components/PostList/PostList';
import { useAlertStore } from '@stores/store';
import React, { useState } from 'react';
import * as Styled from '@components/AdminMain/AdminMain.styled';
import MainLayout from '@components/MainLayout/MainLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserSection from '@components/Dnd/UserSection';
import axios from 'axios';
import { User, UserLevel } from '@/type/user';

const dummyPosts = [
  {
    id: 1,
    category: '자유게시판',
    title: '첫 번째 게시글',
    author: '김선규',
    date: '2024-11-13',
  },
  {
    id: 2,
    category: '공지',
    title: '두 번째 게시글',
    author: '박주호',
    date: '2024-11-12',
  },
  {
    id: 3,
    category: '취업',
    title: '세 번째 게시글',
    author: '이주영',
    date: '2024-11-11',
  },
];

const AdminMain = () => {
  // pagination
  const savedPage = sessionStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState<number>(savedPage ? parseInt(savedPage, 10) : 1);
  const [posts, setPosts] = useState(dummyPosts);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const [isAdmin, setIsAdmin] = useState<boolean>(true); // 관리자 여부 설정
  const { isOpen, message, openModal, closeModal } = useAlertStore();
  const [users, setUsers] = useState<User[]>([
    { email: 'elice@naver.com', postCount: 0, level: '삐약이' },
    { email: 'aro123@naver.com', postCount: 12, level: '삐약이' },
    { email: 'tteam123@naver.com', postCount: 12, level: '꼬꼬닭' },
  ]); // 유저 상태
  const [selectedUser, setSelectedUser] = useState<User | null>(null);  // 탈퇴 시 선택 사용자
  // useEffect(() => {
  //   // GET 요청으로 사용자 정보 가져오기
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('/api/users');
  //       setUsers(response.data); // 응답된 유저 데이터를 상태에 저장
  //     } catch (error) {
  //       console.error('사용자목록을 가져오는데 실패하였습니다.', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // 게시글 삭제 Alert
  const handleDelete = (id: number) => {
    openModal('삭제하시겠습니까?');
    //setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };
  // 삭제 여부 : "네" 버튼 클릭 시 호출되는 함수
  const handleDeleteConfirm = () => {
    console.log('게시글이 삭제되었습니다.');
    //삭제 api 호출 부분 추가 예정
    closeModal();
  };
  // 삭제 여부 : "아니요" 버튼 클릭 시 호출되는 함수
  const handleCancel = () => {
    console.log('모달 닫기', isOpen);
    closeModal();
  };
  // 사용자 탈퇴
  const handleUserDelete = (user: User) => {
    setSelectedUser(user); // 삭제할 사용자 저장
    openModal('탈퇴하시겠습니까?'); // 모달 열기
  };
  // 탈퇴 여부 : "네" 버튼 클릭 시 호출되는 함수
  const handleUserDeleteConfirm = async () => {
    if (!selectedUser) return; // 선택된 사용자가 없으면 종료

    try {
      // API 요청
      // await axios.delete(`/api/users/${id}`);

      // 상태 업데이트
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== selectedUser.email)
      );

      alert(`${selectedUser.email} 사용자가 탈퇴되었습니다.`);
    } catch (error) {
      console.error('사용자 탈퇴 중 오류 발생:', error);
      alert('사용자 탈퇴에 실패했습니다.');
    } finally {
      closeModal(); // 모달 닫기
      setSelectedUser(null); // 선택된 사용자 초기화
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
  };
  // 사용자 레벨 변경 처리 함수
  const handleUserLevelChange = async (user: User, newLevel: UserLevel) => {
    if (user.level === newLevel) return;

    try {
      // API 요청
      // await axios.patch(`/api/users/${user.email}`, { level: newLevel });

      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.email === user.email ? { ...u, level: newLevel } : u
        )
      );
    } catch (error) {
      console.error('사용자 레벨 변경 실패:', error);
      openModal('사용자 레벨 변경에 실패했습니다.');
    }
  };
  // '삐약이 회원'과 '꼬꼬닭 회원'으로 유저를 그룹화
  const piakMembers = users.filter(user => user.level === '삐약이');
  const kkokkodakMembers = users.filter(user => user.level === '꼬꼬닭');
  return (
    <MainLayout>
      <Styled.Container>
        <DndProvider backend={HTML5Backend}>
          <Styled.UserManagement>
            <Styled.SectionTitle>사용자 관리</Styled.SectionTitle>
            <Styled.UserSectionGroup>
              <UserSection
                title="삐약이 회원🐣"
                level="삐약이"
                users={piakMembers}
                onUserDrop={handleUserLevelChange}
                onDelete={handleUserDelete}
              />
              <UserSection
                title="꼬꼬닭 회원🐔"
                level="꼬꼬닭"
                users={kkokkodakMembers}
                onUserDrop={handleUserLevelChange}
                onDelete={handleUserDelete}
              />
            </Styled.UserSectionGroup>
            <Alert isOpen={isOpen} message={message} onConfirm={handleUserDeleteConfirm} onCancel={handleCancel} />
          </Styled.UserManagement>
        </DndProvider>
        <Styled.PostManagement>
          <Styled.SectionTitle>게시판 관리</Styled.SectionTitle>
          <Styled.CategorySelect>
            <label htmlFor="category">카테고리 선택</label>
            <select id="category">
              <option value="all">전체</option>
              <option value="study">등업</option>
              <option value="work">취업 정보</option>
              <option value="work">스터디</option>
            </select>
          </Styled.CategorySelect>
          <Styled.PostListContainer>
            <PostList posts={dummyPosts} width='100%' onDelete={handleDelete} isAdmin={isAdmin} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Styled.PostListContainer>
        </Styled.PostManagement>
      </Styled.Container>
      <Alert isOpen={isOpen} message={message} onConfirm={handleDeleteConfirm} onCancel={handleCancel} />
    </MainLayout>
  );
};

export default AdminMain;
