import React from 'react';
import * as Styled from './Pagination.styled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <Styled.PaginationContainer>
      <Styled.PageButton
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        $isDisabled={currentPage === 1}>
        Prev
      </Styled.PageButton>

      {pages.map((page) => (
        <Styled.PageButton
          key={page}
          onClick={() => handlePageClick(page)}
          $isSelected={currentPage === page}>
          {page}
        </Styled.PageButton>
      ))}

      <Styled.PageButton
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        $isDisabled={currentPage === totalPages}>
        Next
      </Styled.PageButton>
    </Styled.PaginationContainer>
  );
};

export default Pagination;
