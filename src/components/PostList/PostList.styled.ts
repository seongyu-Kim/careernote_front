import styled from 'styled-components';

export const PostListContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '75rem'};
`;

export const MyPostText = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 9px;
  background-color: #dee2e6;
`;

export const DeleteBtn = styled.div`
  flex: 0.5;
  margin-top: 3px;
  color: #e25151;
  border: 1px solid #e25151;
  border-radius: 5px;
  padding: 5px 0;
`;

export const PostItem = styled.div<{ $isNotice?: boolean }>`
  display: flex;
  text-align: center;
  padding: 9px;
  background-color: ${(props) => (props.$isNotice ? '#FFFBFB' : '#ececec')};
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

export const TableCell = styled.div<{ $isTitle?: boolean }>`
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 0 8px;
  cursor: ${(props) => (props.$isTitle ? 'pointer' : 'default')};

  &:hover {
    text-decoration: ${(props) => (props.$isTitle ? 'underline' : 'none')};
  }
`;

export const NoDataText = styled.div`
  text-align: center;
  margin-top: 10px;
`;
