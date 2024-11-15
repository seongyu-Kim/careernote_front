import DefaultButton from '@components/common/DefaultButton/DefaultButton';
import Alert from '@components/common/Alert/Alert';
import Pagination from '@components/Pagination/Pagination';
import PostList from '@components/PostList/PostList';
import { useAlertStore } from '@stores/store';
import React, { useState } from 'react';
import * as Styled from '@components/AdminMain/AdminMain.styled';
import MainLayout from '@components/MainLayout/MainLayout';

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

  // 게시글 삭제
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
  const handleUserDelete = () => {
    openModal('탈퇴하시겠습니까?');
  };
  // 탈퇴 여부 : "네" 버튼 클릭 시 호출되는 함수
  const handleUserDeleteConfirm = () => {
    console.log('사용자가 탈퇴되었습니다.');
    //탈퇴 api 호출 부분 추가 예정
    closeModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
  };
  return (
    <MainLayout>
      <Styled.Container>
        <Styled.UserManagement>
          <Styled.SectionTitle>사용자 관리</Styled.SectionTitle>
          <Styled.UserSectionGroup>
            <Styled.SectionSubtitle>삐약이 회원🐣</Styled.SectionSubtitle>
            <Styled.UserSection>
              <Styled.UserList>
                <Styled.UserItem>
                  <Styled.UserEmail>elice@naver.com</Styled.UserEmail>
                  <Styled.PostCount>0</Styled.PostCount>
                  <DefaultButton
                    textColor="#E25151"
                    border="1px solid #E25151"
                    width="20%"
                    onClick={handleUserDelete}>
                    탈퇴
                  </DefaultButton>
                </Styled.UserItem>
              </Styled.UserList>
            </Styled.UserSection>
            <Styled.SectionSubtitle>꼬꼬닭 회원🐔</Styled.SectionSubtitle>
            <Styled.UserSection>
              <Styled.UserList>
                <Styled.UserItem>
                  <Styled.UserEmail>aro123@naver.com</Styled.UserEmail>
                  <Styled.PostCount>12</Styled.PostCount>
                  <DefaultButton
                    textColor="#E25151"
                    border="1px solid #E25151"
                    width="20%"
                    onClick={handleUserDelete}>
                    탈퇴
                  </DefaultButton>
                </Styled.UserItem>
                <Styled.UserItem>
                  <Styled.UserEmail>tteam123@naver.com</Styled.UserEmail>
                  <Styled.PostCount>12</Styled.PostCount>
                  <DefaultButton
                    textColor="#E25151"
                    border="1px solid #E25151"
                    width="20%"
                    onClick={handleUserDelete}>
                    탈퇴
                  </DefaultButton>
                </Styled.UserItem>
              </Styled.UserList>
            </Styled.UserSection>
          </Styled.UserSectionGroup>
          <Alert
            isOpen={isOpen}
            message={message}
            onDelete={handleUserDeleteConfirm}
            onCancel={handleCancel}
          />
        </Styled.UserManagement>

        <Styled.PostManagement>
          <Styled.SectionTitle>게시판 관리</Styled.SectionTitle>
          <Styled.CategorySelect>
            <label htmlFor="category">카테고리 선택</label>
            <select id="category">
              <option value="all">전체</option>
              <option value="study">스터디</option>
              <option value="work">취업</option>
            </select>
          </Styled.CategorySelect>
          <Styled.PostListContainer>
            <PostList posts={currentPosts} width="100%" onDelete={handleDelete} isAdmin={isAdmin} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Styled.PostListContainer>
        </Styled.PostManagement>
      </Styled.Container>
      <Alert
        isOpen={isOpen}
        message={message}
        onDelete={handleDeleteConfirm}
        onCancel={handleCancel}
      />
    </MainLayout>
  );
};

export default AdminMain;
