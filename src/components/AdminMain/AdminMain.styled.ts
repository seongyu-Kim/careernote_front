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
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

export const UserSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UserSection = styled.div`
  margin-bottom: 20px;
  height: 300px;
  background-color: #f2f2f2;
  max-height: 300px;
  overflow-y: auto;
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
  margin-bottom: 20px;
  select {
    margin-left: 10px;
  }
`;

export const PostListContainer = styled.div`
  margin-top: 20px;
`;
