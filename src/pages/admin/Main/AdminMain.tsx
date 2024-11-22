import { NavbarContainer, PostList, Pagination } from 'components';
import { useAlertStore } from '@stores/store';
import React, { useEffect, useState } from 'react';
import * as Styled from './AdminMain.styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserSection from '@pages/admin/Main/Dnd/UserSection';
import { User, UserLevel } from '@/type/user';
import apiUtils from '@utils/apiUtils';
import { USER_API, BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { useUserStore } from '@stores/userStore';
import { usePostStore } from '@stores/usePostStore';
import { useLocation, useNavigate } from 'react-router-dom';
const { USER_LEVEL_CHANGE, ALL_USER, USER_DELETE } = USER_API;
const { CUD_NOTICE } = NOTICE_API;
const { DETAILS_BOARD, CUD_BOARD, ALL_BOARD, CATEGORY } = BOARD_API;  //공지 외 카테고리 RUD api 주소
interface UserProp {
  _id: number;
  nickname: string;
  level: string;
}
interface Post {
  _id: number;
  title: string;
  category: string;
  user: UserProp;
  createdAt: string;
}

const AdminMain = () => {
  const { filteredPosts, totalPostCount, fetchAllPosts, selectedCategory } = usePostStore();
  const navigate = useNavigate();
  const location = useLocation();
  //페이지 번호
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1');

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPostCount / postsPerPage);

  useEffect(() => {
    fetchAllPosts(currentPage, postsPerPage);
  }, [selectedCategory, currentPage, fetchAllPosts]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    await fetchAllPosts(page, postsPerPage);
  };


  const [isAdmin, setIsAdmin] = useState<boolean>(true); // 관리자 여부 설정
  const { openAlert, closeAlert } = useAlertStore();
  const userId = useUserStore((state) => state.user?.user_id);
  const userLevel = useUserStore((state) => state.user?.level._id);
  const [users, setUsers] = useState<User[]>([]); // 유저 상태


  // 사용자 데이터를 가져오는 함수
  const fetchUsers = async () => {
    try {
      const response = await apiUtils({
        url: ALL_USER,
        method: 'GET',
      });
      console.log('사용자 데이터:', response);
      // postCount 계산 후 상태 업데이트
      const updatedUsers = response.data.map((user: any) => ({
        id: user._id,
        email: user.email,
        nickname: user.nickname,
        level: user.level?.name || '알 수 없음',
        postCount: user.boards?.length || 0,
      }));

      setUsers(updatedUsers); // 상태 업데이트
    } catch (error) {
      console.error('사용자 데이터 가져오기 실패:', error);
    }
  };

  // '삐약이 회원'과 '꼬꼬닭 회원'으로 유저를 그룹화
  const piakMembers = users.filter((user) => user.level === '삐약이');
  const kkokkodakMembers = users.filter((user) => user.level === '꼬꼬닭');

  // // 카테고리 변경 시 데이터 필터링
  // useEffect(() => {
  //   fetchAllPosts(); // 모든 게시글을 가져오는 요청
  // }, [selectedCategory]); // selectedCategory가 변경될 때마다 실행

  // // 게시판 카테고리 선택
  // const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const category = event.target.value;
  //   setCategory(category); // 선택한 카테고리를 Zustand 상태에 설정
  // };

  // 게시글 삭제 Alert
  const handleDelete = async (id: number, category: string) => {
    openAlert('삭제하시겠습니까?', () => handleDeleteConfirm(id, category));
  };
  // 게시글 삭제 함수
  const handleDeleteConfirm = async (id: number, category: string) => {
    try {
      let url;
      let data;

      if (!category) {
        // 공지 삭제 요청
        url = CUD_NOTICE;
        data = {
          notice_id: id,
          user: userId,
        };
      } else {
        // 일반 게시글 삭제 요청
        url = CUD_BOARD;
        data = {
          board_id: id,
          user: userId,
          level: userLevel,
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
      await fetchAllPosts();

    } catch (error) {
      console.error('게시글 삭제 요청 실패:', error);
      ErrorToast('다시 시도해주세요.')
    }
    closeAlert();
  };

  // 사용자 탈퇴 Alert
  const handleUserDelete = async (id: string) => {
    openAlert('이 회원을 탈퇴시키겠습니까?', () => handleUserDeleteConfirm(id)); // 모달 열기
  };
  // 사용자 탈퇴 함수
  const handleUserDeleteConfirm = async (id: string) => {
    try {
      await apiUtils({
        url: USER_DELETE,
        method: 'DELETE',
        data: { 'user_id': id },
      });

      // 상태 업데이트
      //setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
      console.log('사용자 탈퇴 성공했습니다.');
      SuccessToast(`${id} 사용자가 탈퇴되었습니다.`);
      await fetchUsers();
    } catch (error) {
      console.error('사용자 탈퇴 중 오류 발생:', error);
      ErrorToast(`${id}사용자 탈퇴에 실패했습니다.`);
    } finally {
      closeAlert(); // 모달 닫기
    }
  };


  // 사용자 레벨 변경
  const handleUserLevelChange = async (userId: string, newLevel: UserLevel) => {
    try {
      await apiUtils({
        url: USER_LEVEL_CHANGE,
        method: 'PUT',
        data: {
          "user_id": userId,
          "new_level": newLevel
        },
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, level: newLevel } : user
        ));
      console.log('사용자 레벨 변경 성공');
      SuccessToast('사용자의 레벨이 변경되었습니다.')
    } catch (error) {
      console.error('사용자 레벨 변경 실패:', error);
      ErrorToast('사용자의 레벨 변경이 실패하였습니다.')
    }
  };

  //테이블 데이터
  const columns = [
    { key: 'category', label: '카테고리', flex: '1' },
    { key: 'title', label: '제목', flex: '3' },
    { key: 'user', label: '작성자', flex: '1' },
    { key: 'createdAt', label: '작성일', flex: '1' },
  ];
  return (
    <NavbarContainer>
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
            <select id="category" value={selectedCategory} onChange={() => console.log('아직')}>
              <option value="자유게시판">전체</option>
              <option value="공지">공지</option>
              <option value="등업">등업</option>
              <option value="취업정보">취업정보</option>
              <option value="스터디">스터디</option>
            </select>
          </Styled.CategorySelect>
          <Styled.PostListContainer>
            <PostList posts={filteredPosts} columns={columns} width="100%" onDelete={handleDelete} isAdmin={isAdmin} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Styled.PostListContainer>
        </Styled.PostManagement>
      </Styled.Container>
    </NavbarContainer>
  );
};

export default AdminMain;
