import styled, { keyframes } from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 66px;
  padding: 0 20px;
  background-color: #79b0cb;
  color: white;
  z-index: 10000;
`;

export const MenuButton = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

export const Logo = styled.button`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;
`;

export const LogoImg = styled.img`
  width: 164px;
  height: 51px;
`;

export const LogoutBox = styled.div`
  display: flex;
  color: white;
  font-weight: 700;
  gap: 10px;
`;

export const UserNameText = styled.div`
  color: #325366;
`;

export const Logout = styled.div`
  cursor: pointer;
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

interface MenuProps {
  $isOpen: boolean;
}

export const Menu = styled.div<MenuProps>`
  position: fixed;
  top: 66px;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s forwards;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #325366;
  font-weight: bold;
  align-items: center;
  margin-top: 10px;
`;

export const UserName = styled.div`
  margin-top: 40px;
`;

export const Hr = styled.hr`
  width: 220px;
  border: none;
  border-top: 1px solid #d9d9d9;
  margin: 15px;
`;

export const UserInfoDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

export const UserInfoItem = styled.div`
  cursor: pointer;
`;

export const QuitBtn = styled.button`
  width: 62px;
  height: 20px;
  border: 1px solid #f44336;
  border-radius: 8px;

  color: #f44336;
  font-size: 12px;
  font-weight: bold;

  margin-top: 30px;
  margin-bottom: 15px;

  cursor: pointer;
`;

export const MenuItem = styled.div`
  display: block;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  background-color: #f5f5f5;
`;

interface MenuItemBtnProps {
  $isSelected: boolean;
}

export const MenuItemBtn = styled.button<MenuItemBtnProps>`
  font-weight: bold;
  padding: 30px;
  width: 100%;
  border: none;
  color: ${({ $isSelected }) => ($isSelected ? '#79B0CB' : '#325366')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#ffffff' : '#f5f5f5')};
  text-align: left;
  cursor: pointer;
`;
