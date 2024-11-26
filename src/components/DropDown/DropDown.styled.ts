import styled from 'styled-components';

export const ActionWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;

  &:hover {
    background-color: #f0f0f0;
    color: #555;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  padding: 8px 0;
`;

export const DropdownItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const NoOptions = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #999;
  text-align: center;
`;