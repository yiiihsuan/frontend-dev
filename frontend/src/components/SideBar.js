// // SideBar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

// const SidebarContainer = styled.div`
//   width: ${(props) => (props.isOpen ? '200px' : '80px')}; /* Control the sidebar width */
//   background-color: #333;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
//   transition: width 0.3s;
//   position: relative;

//   &:hover {
//     width: 200px;
//   }
// `;

// const SidebarItem = styled(Link)`
//   color: white;
//   text-decoration: none;
//   margin-bottom: 20px;
//   font-family: 'Luckiest Guy', "Chocolate Classical Sans", sans-serif, cursive;
//   font-size: 1.5em;
//   display: flex;
//   align-items: center;
//   justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
//   width: 100%;

//   & > span {
//     margin-left: 10px;
//     display: ${(props) => (props.isOpen ? 'inline' : 'none')};
//   }

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Sidebar = ({ isOpen, setIsOpen }) => {

  
//   return (
//     <SidebarContainer
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//       isOpen={isOpen}
//     >
//       <SidebarItem to="/" isOpen={isOpen}>
//         <FaHome />
//         <span>Home</span>
//       </SidebarItem>
//       <SidebarItem to="/profile" isOpen={isOpen}>
//         <FaUser />
//         <span>Profile</span>
//       </SidebarItem>
//       <SidebarItem to="/settings" isOpen={isOpen}>
//         <FaCog />
//         <span>Settings</span>
//       </SidebarItem>
//       <SidebarItem to="/logout" isOpen={isOpen}>
//         <FaSignOutAlt />
//         <span>Logout</span>
//       </SidebarItem>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? '200px' : '80px')}; /* Control the sidebar width */
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
  margin-bottom: 20px;
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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const history = useHistory();

  const handleLogout = () => {
    // 清除localStorage的token
    localStorage.removeItem('token');

    // 重定向到首页
    history.push('/');
  };

  return (
    <SidebarContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <SidebarItem to="/" isOpen={isOpen}>
        <FaHome />
        <span>Home</span>
      </SidebarItem>
      <SidebarItem to="/profile" isOpen={isOpen}>
        <FaUser />
        <span>Profile</span>
      </SidebarItem>
      <SidebarItem to="/settings" isOpen={isOpen}>
        <FaCog />
        <span>Settings</span>
      </SidebarItem>
      {/* 修改的登出按钮 */}
      <SidebarItem as="div" onClick={handleLogout} isOpen={isOpen}>
        <FaSignOutAlt />
        <span>Logout</span>
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;

