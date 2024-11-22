import React, { useState } from 'react';
import * as Styled from './DropDown.styled';

interface DropDownProps {
  options: { label: string; action: () => void }[];
  icon?: React.ReactNode;
  noOptionsMessage?: string; // 옵션이 없을 때 표시할 메시지
}

const DropDown = ({ options, icon, noOptionsMessage = '권한이 없습니다.' }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Styled.ActionWrapper>
      <Styled.MoreButton onClick={toggleDropdown}>
        {icon || '⋮'}
      </Styled.MoreButton>
      {isOpen && (
        <Styled.DropdownMenu>
          {options.length > 0 ? (
            options.map((option, index) => (
              <Styled.DropdownItem key={index} onClick={option.action}>
                {option.label}
              </Styled.DropdownItem>
            ))
          ) : (
            <Styled.NoOptions>{noOptionsMessage}</Styled.NoOptions>
          )}
        </Styled.DropdownMenu>
      )}
    </Styled.ActionWrapper>
  );
};

export default DropDown;
