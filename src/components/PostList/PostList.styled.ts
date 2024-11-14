import styled from 'styled-components';

export const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75rem;
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

export const Title = styled.div`
  flex: 3;
  margin-top: 3px;
`;

export const Author = styled.div`
  flex: 1;
  margin-top: 3px;
`;

export const Date = styled.div`
  flex: 2;
  margin-top: 3px;
`;

export const PostItem = styled.div`
  display: flex;
  text-align: center;
  padding: 9px 0;
  background-color: #ececec;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
  gap: 5px;
`;

export const WriteButton = styled.button`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;

  margin-bottom: 6px;
  cursor: pointer;

  &:checked {
    background-color: red;
  }
`;
