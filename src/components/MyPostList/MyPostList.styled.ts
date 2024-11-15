import styled from 'styled-components';

export const PostListContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '75rem'};
`;

export const LogoImg = styled.img`
  /* width: 20%; */
  width: 693px;
  height: 220px;
  justify-content: center;

  margin: 40px 0;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 0;
  font-weight: 800;
  background-color: #dee2e6;
`;

export const Category = styled.div`
  flex: 1;
  margin-top: 3px;
`;

export const Title = styled.div<{ noPointer?: boolean }>`
  flex: 3;
  margin-top: 3px;
  cursor: ${(props) => (props.noPointer ? 'default' : 'pointer')};

  &:hover {
    text-decoration: ${(props) => (props.noPointer ? 'none' : 'underline')};
  }
`;
export const Author = styled.div`
  flex: 1;
  margin-top: 3px;
`;

export const Date = styled.div`
  flex: 2;
  margin-top: 3px;
`;

export const Delete = styled.div`
  flex: 0.5;
  margin-top: 3px;
`;

export const DeleteBtn = styled.div`
  flex: 0.5;
  margin-top: 3px;
  color: #e25151;
  border: 1px solid #e25151;
  border-radius: 5px;
  padding: 5px 0;
`;

export const PostItem = styled.div`
  display: flex;
  text-align: center;
  padding: 9px;
  background-color: #ececec;
`;
