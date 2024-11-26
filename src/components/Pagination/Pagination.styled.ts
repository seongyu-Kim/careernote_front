import styled from 'styled-components';

interface PageButtonProps {
  $isSelected?: boolean;
  $isDisabled?: boolean;
}

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 80px 0;
  justify-content: center;
`;

export const PageButton = styled.button<PageButtonProps>`
  padding: 12px 17px;
  background-color: ${({ $isSelected }) => ($isSelected ? '#1E90FF' : '#fff')};

  color: ${({ $isSelected, $isDisabled }) =>
    $isSelected ? '#fff' : $isDisabled ? '#ABB5BE' : '#1E90FF'};
  border: 1px solid #dee2e6;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;

  &:hover {
    background-color: ${({ $isDisabled, $isSelected }) =>
      !$isDisabled && !$isSelected ? '#f0f0f0' : undefined};
  }
`;
