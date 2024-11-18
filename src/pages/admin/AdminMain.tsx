import Pagination from '@components/Pagination/Pagination';
import PostList from '@components/common/PostList/PostList';
import { useAlertStore } from '@stores/store';
import React, { useEffect, useState } from 'react';
import * as Styled from '@components/AdminMain/AdminMain.styled';
import MainLayout from '@components/MainLayout/MainLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserSection from '@components/Dnd/UserSection';
import { User, UserLevel } from '@/type/user';
import apiUtils from '@utils/apiUtils';
import { USER_API, BOARD_API, COMMON_API } from '@routes/apiRoutes';
const { UPDATE_INFO, ALL_USER, USER_DELETE } = USER_API;
const { ALL_BOARD, CATEGORY } = BOARD_API;
const { DELETE_NOTICE } = COMMON_API

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
  const { openAlert, closeAlert } = useAlertStore();
  const [category, setCategory] = useState('all');
  const [users, setUsers] = useState<User[]>([
    { id: '11', email: 'elice@naver.com', postCount: 0, level: '삐약이', nickname: 'dd' },
    { id: '2', email: 'aro123@naver.com', postCount: 12, level: '삐약이', nickname: 'dd' },
    { id: '3', email: 'tteam123@naver.com', postCount: 12, level: '꼬꼬닭', nickname: 'dd' },
  ]); // 유저 상태
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // 탈퇴 시 선택 사용자

  // 모든 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiUtils({
          url: ALL_USER,
          method: 'GET',
        });
        console.log('사용자 데이터:', response);
        setUsers(response);
      } catch (error) {
        console.error('사용자 데이터 가져오기 실패:', error);
      }
    };

    fetchUsers();
  }, []);
  // '삐약이 회원'과 '꼬꼬닭 회원'으로 유저를 그룹화
  const piakMembers = users.filter((user) => user.level === '삐약이');
  const kkokkodakMembers = users.filter((user) => user.level === '꼬꼬닭');

  // 모든 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiUtils({
          url: ALL_BOARD,
          method: 'GET',
        });
        console.log('게시글 데이터:', response);
        setPosts(response);
      } catch (error) {
        console.error('게시글 데이터 가져오기 실패:', error);
      }
    };

    fetchPosts();
  }, []);

  // 게시판 카테고리 선택
  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    try {
      // 서버 요청
      const response = await apiUtils({
        url: CATEGORY(selectedCategory),
        method: 'GET',
      });

      console.log('서버 응답 데이터:', response);
      setPosts(response.data);
    } catch (error) {
      console.error('카테고리 변경 요청 실패:', error);
    }
  };

  // 게시글 삭제 Alert
  const handleDelete = (id: number) => {
    openAlert('삭제하시겠습니까?', () => handleDeleteConfirm(id));
  };
  // 게시글 삭제 함수
  const handleDeleteConfirm = async (id: number) => {
    try {
      // 서버 요청
      const response = await apiUtils({
        url: DELETE_NOTICE(id),
        method: 'DELETE',
      });
      console.log('게시글 삭제 성공 응답 데이터:', response);
      alert(`게시글이 ${id}가 삭제되었습니다.`);
    } catch (error) {
      console.error('게시글 삭제 요청 실패:', error);
    }
    closeAlert();
  };

  // 사용자 탈퇴 Alert
  const handleUserDelete = (id: string) => {
    openAlert('이 회원을 탈퇴시키겠습니까?', () => handleUserDeleteConfirm(id)); // 모달 열기
  };
  // 사용자 탈퇴 함수
  const handleUserDeleteConfirm = async (id: string) => {
    try {
      await apiUtils({
        url: USER_DELETE,
        method: 'DELETE',
        data: { id },
      });

      // 상태 업데이트
      //setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
      console.log('사용자 탈퇴 성공했습니다.')
      alert(`${id} 사용자가 탈퇴되었습니다.`);
    } catch (error) {
      console.error('사용자 탈퇴 중 오류 발생:', error);
      alert(`${id}사용자 탈퇴에 실패했습니다.`);
    } finally {
      closeAlert(); // 모달 닫기
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
  };

  // 사용자 레벨 변경 처리 함수 수정 필요,,, 어떤 값 넘겨줘야하는지 미정
  const handleUserLevelChange = async (user: User, newLevel: UserLevel) => {
    if (user.level === newLevel) return;
    try {
      await apiUtils({
        url: UPDATE_INFO,
        method: 'PUT',
        data: { nickname: 'nickname만? level까지? 보류...' },
      });

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.email === user.email ? { ...u, level: newLevel } : u)),
      );
      console.log('사용자 레벨 변경 성공')
    } catch (error) {
      console.error('사용자 레벨 변경 실패:', error);
      alert('사용자 레벨 변경에 실패했습니다.');
    }
  };

  //postlist수정
  const columns = [
    { key: 'category', label: '카테고리', flex: '1' },
    {
      key: 'title',
      label: '제목',
      flex: '3',
    },
    { key: 'author', label: '작성자', flex: '1' },
    { key: 'date', label: '작성일', flex: '1' },
  ];
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
          </Styled.UserManagement>
        </DndProvider>
        <Styled.PostManagement>
          <Styled.SectionTitle>게시판 관리</Styled.SectionTitle>
          <Styled.CategorySelect>
            <label htmlFor="category">카테고리 선택</label>
            <select id="category" value={category} onChange={handleCategoryChange}>
              <option value="all">전체</option>
              <option value="등업">등업</option>
              <option value="취업">취업</option>
              <option value="스터디">스터디</option>
            </select>
          </Styled.CategorySelect>
          <Styled.PostListContainer>
            <PostList
              //postlist수정
              columns={columns}
              posts={dummyPosts}
              width="100%"
              onDelete={handleDelete}
              isAdmin={isAdmin}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Styled.PostListContainer>
        </Styled.PostManagement>
      </Styled.Container>
    </MainLayout>
  );
};

export default AdminMain;
