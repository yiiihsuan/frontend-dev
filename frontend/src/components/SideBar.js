import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaFileAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? '200px' : '80px')}; 
  background-color: #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  transition: width 0.3s;
  position: relative;

  &:hover {
    width: 200px;
  }
`;

const SidebarItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 30px; /* 增加間距 */
  font-family: 'Luckiest Guy', "Chocolate Classical Sans", sans-serif, cursive;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
  width: 100%;

  & > span {
    margin-left: 10px;
    display: ${(props) => (props.isOpen ? 'inline' : 'none')};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const LogoContainer = styled.div`
  padding: 10px;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;

  img {
    width: ${(props) => (props.isOpen ? '100px' : '80px')};
    transition: width 0.3s ease;
  }
`;

const Icon = styled.div`
  font-size: ${(props) => (props.isOpen ? '1.8em' : '2.0em')}; /* 調整圖標大小 */
  transition: font-size 0.3s ease;
`;


const Sidebar = ({ isOpen, setIsOpen, setIsLoggedIn }) => {


  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Token before logout:', localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log('Token after logout:', localStorage.getItem('token'));
    setIsLoggedIn(false);
    navigate('/');
    console.log('Navigating to login page...');

  };


  return (
    <SidebarContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      isOpen={isOpen}
    >

      <LogoContainer isOpen={isOpen}>
        <img src="/genenetlogo_small.png" alt="Genenet Logo" />
      </LogoContainer>


      <SidebarItem to="/" isOpen={isOpen}>
        <Icon isOpen={isOpen}>
          <FaHome />
        </Icon>
        <span>Home</span>
      </SidebarItem>

      <SidebarItem to="/profile" isOpen={isOpen}>
        <Icon isOpen={isOpen}>
          <FaUser />
        </Icon>
        <span>Profile</span>
      </SidebarItem>

      {/* <SidebarItem to="/settings" isOpen={isOpen}>
        <Icon isOpen={isOpen}>
          <FaCog />
        </Icon>
        <span>Settings</span>
      </SidebarItem> */}

      <SidebarItem to="/document" isOpen={isOpen}>
        <Icon isOpen={isOpen}>
          <FaFileAlt />
        </Icon>
        <span>Document</span>
      </SidebarItem>

      <SidebarItem as="div" onClick={handleLogout} isOpen={isOpen}>
        <Icon isOpen={isOpen}>
          <FaSignOutAlt />
        </Icon>
        <span>Logout</span>
      </SidebarItem>

    </SidebarContainer>
  );
};

export default Sidebar;

