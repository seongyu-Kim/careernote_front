import { NavbarContainer, PostList, Pagination, Button } from 'components';
import { useAlertStore, useModal } from '@stores/store';
import React, { useEffect, useState } from 'react';
import * as Styled from './AdminMain.styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserSection from '@pages/admin/Main/Dnd/UserSection';
import { User, UserLevel } from '@/type/user';
import apiUtils from '@utils/apiUtils';
import { USER_API, BOARD_API, NOTICE_API } from '@routes/apiRoutes';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { usePostStore } from '@stores/usePostStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategoryStore } from '@stores/useCategoryStore';
const { USER_LEVEL_CHANGE, ALL_USER, USER_DELETE } = USER_API;
const { DETAILS_BOARD: DETAILS_NOTICE } = NOTICE_API;
const { DETAILS_BOARD, } = BOARD_API;

const AdminMain = () => {
  const {
    posts,
    totalPostCount,
    fetchAllPosts,
    selectedCategory,
    setCategory,
    fetchNoticePosts,
    fetchPostsByCategory,
    postsByCategory,
  } = usePostStore();
  const { categories, fetchCategories, deleteCategory } = useCategoryStore();
  const navigate = useNavigate();
  const location = useLocation();
  //페이지 번호
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1');

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPostCount / postsPerPage);

  useEffect(() => {
    if (selectedCategory === '공지') {
      fetchNoticePosts(currentPage, postsPerPage);
    } else if (selectedCategory && selectedCategory !== '전체게시판') {
      fetchPostsByCategory(currentPage, postsPerPage);
    } else {
      fetchAllPosts(currentPage, postsPerPage);
    }
  }, [selectedCategory, currentPage]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    await fetchAllPosts(page, postsPerPage);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //체크박스
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // 관리자 여부 설정
  const { openAlert, closeAlert } = useAlertStore();
  const [users, setUsers] = useState<User[]>([]); // 유저 상태

  // 사용자 데이터를 가져오는 함수
  const fetchUsers = async () => {
    try {
      const response = await apiUtils({
        url: ALL_USER,
        method: 'GET',
      });
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

  // 게시글 삭제 Alert
  const handleDelete = async (id: string, category: string) => {
    openAlert('삭제하시겠습니까?', () => handleDeleteConfirm(id, category));
  };

  // 게시글 삭제 함수
  const handleDeleteConfirm = async (id: string, category: string) => {
    const url = !category ? DETAILS_NOTICE(id) : DETAILS_BOARD(id);

    try {
      const response = await apiUtils({
        url,
        method: 'DELETE',
      });
      console.log(`${!category ? '공지' : '게시글'} 삭제 성공 응답 데이터:`, response);
      SuccessToast(`${!category ? '공지' : '게시글'}이 삭제되었습니다.`);
      await fetchAllPosts();
    } catch (error) {
      console.error(`${!category ? '공지' : '게시글'} 삭제 요청 실패:`, error);
      ErrorToast('삭제 요청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      closeAlert();
    }
  };


  // 사용자 탈퇴 Alert
  const handleUserDelete = async (id: string, userEmail: string) => {
    openAlert('이 회원을 탈퇴시키겠습니까?', () => handleUserDeleteConfirm(id, userEmail)); // 모달 열기
  };
  // 사용자 탈퇴 함수
  const handleUserDeleteConfirm = async (id: string, userEmail: string) => {
    try {
      await apiUtils({
        url: USER_DELETE,
        method: 'DELETE',
        data: { user_id: id },
      });

      // 상태 업데이트
      //setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
      console.log('사용자 탈퇴 성공했습니다.');
      SuccessToast(`${userEmail} 사용자가 탈퇴되었습니다.`);
      await fetchUsers();
    } catch (error) {
      console.error('사용자 탈퇴 중 오류 발생:', error);
      ErrorToast(`${userEmail}사용자 탈퇴에 실패했습니다.`);
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
          user_id: userId,
          new_level: newLevel,
        },
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, level: newLevel } : user)),
      );
      console.log('사용자 레벨 변경 성공');
      SuccessToast('사용자의 레벨이 변경되었습니다.');
    } catch (error) {
      console.error('사용자 레벨 변경 실패:', error);
      ErrorToast('사용자의 레벨 변경이 실패하였습니다.');
    }
  };

  useEffect(() => {
    fetchCategories();
    console.log('categories', categories);
  }, []);

  const { setIsOpen, setModalState } = useModal();
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
          {/*카테고리 관리 부분*/}
          <Styled.CategoryListHeader>
            <Styled.SectionTitle>카테고리 관리</Styled.SectionTitle>
            <Button
              onClick={() => {
                setModalState('addCategory');
                setIsOpen(true);
              }}
              width="auto"
              padding="2px 15px 2px 15px"
              position="relative"
              bottom="7px"
              border="none"
              textColor="white"
              backgroundColor="#79B0CB"
              useHover={true}
              useTransition={true}
              transitionDuration={0.3}
              hoverBackgroundColor="#3F82AC">
              카테고리 추가
            </Button>
          </Styled.CategoryListHeader>
          <Styled.CategoryListMenu>
            <Styled.CategoryListContent>
              <span>카테고리명</span>
            </Styled.CategoryListContent>
            <Styled.CategoryListContent>
              <span className="menu">관리</span>
            </Styled.CategoryListContent>
          </Styled.CategoryListMenu>
          {/* 카테고리 */}
          <Styled.CategoryListContainer>
            <Styled.CategoryListFiled>
              {categories.map((item, key) => {
                return (
                  <Styled.CategoryListBox>
                    <Styled.CategoryList key={key}>
                      <Styled.CategoryListContent>{item.name}</Styled.CategoryListContent>
                      <Styled.CategoryListContent>
                        <Button
                          width="25%"
                          border="none"
                          textColor="white"
                          backgroundColor="#E25151"
                          useHover={true}
                          hoverBackgroundColor="#CD4444"
                          useTransition={true}
                          transitionDuration={0.2}
                          onClick={() => deleteCategory(item.name)}>
                          삭제
                        </Button>
                      </Styled.CategoryListContent>
                    </Styled.CategoryList>
                  </Styled.CategoryListBox>
                );
              })}
            </Styled.CategoryListFiled>
          </Styled.CategoryListContainer>
          {/*카테고리 관리 부분*/}
          <Styled.SectionTitle>게시판 관리</Styled.SectionTitle>

          <Styled.CategorySelect>
            <label htmlFor="category">카테고리 선택</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setCategory(e.target.value)}>
              <option key="all" value="전체게시판">
                전체게시판
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </Styled.CategorySelect>

          <Styled.PostListContainer>
            <PostList
              posts={
                selectedCategory === '전체게시판' || selectedCategory === '공지'
                  ? posts
                  : postsByCategory
              }
              columns={columns}
              width="100%"
              onDelete={handleDelete}
              isAdmin={isAdmin}
              isChecked={isChecked}
              setChecked={setChecked}
            />
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
