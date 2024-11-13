import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 0 20px;
  background-color: #79b0cb;
  color: white;
`;

export const MenuButton = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

export const Menu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  background-color: #f5f5f5;
`;

export const MenuItem = styled.div`
  display: block;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  background-color: #f5f5f5;
`;

interface MenuItemBtnProps {
  isSelected: boolean;
}

export const MenuItemBtn = styled.button<MenuItemBtnProps>`
  font-weight: bold;
  padding: 30px;
  width: 100%;
  border: none;
  color: ${({ isSelected }) => (isSelected ? '#79B0CB' : '#325366')};
  background-color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#f5f5f5')};
  text-align: left;
  cursor: pointer;
`;
