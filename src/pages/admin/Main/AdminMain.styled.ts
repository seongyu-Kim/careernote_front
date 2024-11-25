import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  width: 100%;
`;

export const UserManagement = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const PostManagement = styled.div`
  flex: 2;
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
export const SectionSubList = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 10px 20px;
  font-weight: bold;
  background-color:#dee2e6;
  border-radius: 10px 10px 0 0;
`;

export const UserSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UserSection = styled.div`
  margin-bottom: 20px;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  margin: 20px 10px;
  border-radius: 10px;
`;

export const UserEmail = styled.span`
  font-weight: bold;
  width: 60%;
`;

export const PostCount = styled.span`
  color: #ff6b6b;
  width: 20%;
`;

export const CategorySelect = styled.div`
  select {
    margin-left: 10px;
  }
`;

export const PostListContainer = styled.div`
  margin-top: 10px;
`;

//카테고리 관리 리스트
export const CategoryListHeader = styled.header`
  display: flex;
  gap: 20px;
  align-items: center;
  position: relative;
`;

export const CategoryListMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  //gap: 50%;
  width: 100%;
  background: #dee2e6;
  border-radius: 10px 10px 0 0;
  padding: 10px 0 10px 0;
  font-weight: bold;
`;

export const CategoryListContainer = styled(PostListContainer)`
  margin-bottom: 10px;
  width: 100%;
  height: 300px;
`;
export const CategoryListFiled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  overflow-y: scroll;
  padding-top: 10px; /* 스크롤 문제 방지를 위해 */
  box-sizing: border-box; /* 패딩 포함 높이 계산 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const CategoryListBox = styled.ul`
  width: 100%;
  border-bottom: 1px solid #c9c9c9;
`;

export const CategoryList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  //gap: 50%;
  width: 100%;
  padding: 10px 10px 20px 10px;
`;
export const CategoryListContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .menu {
    padding-right: 5%;
  }
`;
