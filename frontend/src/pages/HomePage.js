import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaUser } from 'react-icons/fa';
import { getUserInfo, fetchProjects, createProject } from '../api';
import Sidebar from '../components/SideBar'; 
import { useAuth } from '../context/AuthContext';  



const Layout = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const AddProjectCard = styled.div`
  background-color: #e0e0e0;
  border: 2px dashed #aaa;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2em;
  color: #333;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

const ProjectName = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1em;
  margin-bottom: 8px;
`;

const TaskCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  height: 300px; 
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #33333;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const UserProfile = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  color: #333;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em; //scale the icon 
  margin-right: 10px;
  color: #333; 
`;



const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();  

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const { data: projects, error, isLoading, isError } = useQuery('projects', fetchProjects, {
    retry: 1,
    onError: (error) => {
      if (error.message === 'Unauthorized') {
        alert('Session expired, please log in again.');
        logout();  
        navigate('/');
      }
    },
  });

  const { data: userInfo, error: userError } = useQuery('userInfo', getUserInfo, {
    retry: 1,
    onError: (error) => {
      if (error.message === 'Unauthorized') {
        alert('Session expired, please log in again.');
        logout();  
        navigate('/');
      }
    },
  });

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      setIsModalOpen(false);
      setNewProjectName('');
    },
  });

  const handleCreateProject = () => {
    mutation.mutate(newProjectName);
  };

  const handleProjectClick = (projectId) => {
    localStorage.setItem('projectId', projectId); 
    navigate(`/project/${projectId}`); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainContent>
        <Title>Projects</Title>
        <ProjectGrid>
          <AddProjectCard onClick={() => setIsModalOpen(true)}>
            <FaPlus />
          </AddProjectCard>
          {projects.map((project) => (
            <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
              <ProjectName>{project.project_name}</ProjectName>
              <p>Project ID: {project.id}</p>
            </ProjectCard>
          ))}
        </ProjectGrid>
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <ModalTitle>Create New Project</ModalTitle>
              <ModalInput
                type="text"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <ButtonGroup>
                <ModalButton onClick={handleCreateProject}>Create</ModalButton>
                <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
      <UserProfile>
        <UserAvatar>
          <FaUser />
        </UserAvatar>
        <span>{userInfo?.username}</span>
      </UserProfile>
    </Layout>
  );
};

export default HomePage;


//還沒有authcontext 前的原始版本
// import React, { useState, useEffect } from 'react';
// //import { Link } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import styled from 'styled-components';
// import { FaPlus, FaUser} from 'react-icons/fa';
// import { getUserInfo, fetchProjects } from '../api'; 
// import { createProject } from '../api';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/SideBar'; 


// const Layout = styled.div`
//   display: flex;
//   height: 100vh;
//   position: relative;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   padding: 20px;
//   overflow-y: auto;
//   background-color: #f0f0f0;
// `;

// const Title = styled.h1`
//   font-size: 2em;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const ProjectGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
// `;

// const AddProjectCard = styled.div`
//   background-color: #e0e0e0;
//   border: 2px dashed #aaa;
//   border-radius: 5px;
//   padding: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-size: 2em;
//   color: #333;

//   &:hover {
//     background-color: #d0d0d0;
//   }
// `;

// const ProjectCard = styled.div`
//   background-color: white;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 20px;
// `;

// const ProjectName = styled.h2`
//   font-size: 1.5em;
//   color: #333;
//   margin-bottom: 10px;
// `;

// const TaskList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const TaskItem = styled.li`
//   display: flex;
//   align-items: center;
//   font-size: 1em;
//   margin-bottom: 8px;
// `;

// const TaskCheckbox = styled.input.attrs({ type: 'checkbox' })`
//   margin-right: 10px;
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 5px;
//   width: 400px;
//   max-width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center; 
//   height: 300px; 
// `;

// const ModalTitle = styled.h2`
//   margin-top: 0;
//   text-align: center;
// `;

// const ModalInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const ModalButton = styled.button`
//   background-color: black;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #33333;
//   }

//   &:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
// `;

// const UserProfile = styled.div`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   display: flex;
//   align-items: center;
//   color: #333;
// `;

// const UserAvatar = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5em; //scale the icon 
//   margin-right: 10px;
//   color: #333; 
// `;



// const HomePage = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [isOpen, setIsOpen] = useState(false);

//   // const { data: projects, error, isLoading, isError } = useQuery('projects', fetchProjects);
//   // const { data: userInfo } = useQuery('userInfo', getUserInfo);

  
//   const { data: projects, error, isLoading, isError } = useQuery('projects', fetchProjects, {
//     onError: (error) => {
//       if (error.message === 'Unauthorized') {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//         navigate('/login');
//       }
//     },
//   });

//   const { data: userInfo, error: userError } = useQuery('userInfo', getUserInfo, {
//     onError: (error) => {
//       if (error.message === 'Unauthorized') {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//         navigate('/login');
//       }
//     },
//   });
  
  
  
  
  
//   onst [isModalOpen, setIsModalOpen] = useState(false);
//   const [newProjectName, setNewProjectName] = useState('');


//   const mutation = useMutation(createProject, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('projects');
//       setIsModalOpen(false);
//       setNewProjectName('');
//     },
//   });


//   const handleCreateProject = () => {
//     mutation.mutate(newProjectName);
//   };

//   const handleProjectClick = (projectId) => {
//     localStorage.setItem('projectId', projectId); 
//     navigate(`/project/${projectId}`); 
//   };


//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <Layout>
//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsLoggedIn={setIsLoggedIn} />
//       <MainContent>
//         <Title>Projects</Title>
//         <ProjectGrid>
//           <AddProjectCard onClick={() => setIsModalOpen(true)}>
//             <FaPlus />
//           </AddProjectCard>
//           {projects.map((project) => (
//             // <ProjectCard key={project.id} onClick={() => navigate(`/project/${project.id}`)}>
//             <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
//               <ProjectName>{project.project_name}</ProjectName>
//               <p>Project ID: {project.id}</p>
//             </ProjectCard>
//           ))}
//         </ProjectGrid>
//         {isModalOpen && (
//           <Modal>
//             <ModalContent>
//               <ModalTitle>Create New Project</ModalTitle>
//               <ModalInput
//                 type="text"
//                 placeholder="Project Name"
//                 value={newProjectName}
//                 onChange={(e) => setNewProjectName(e.target.value)}
//               />
//               <ButtonGroup>
//                 <ModalButton onClick={handleCreateProject}>Create</ModalButton>
//                 <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
//               </ButtonGroup>
//             </ModalContent>
//           </Modal>
//         )}
//       </MainContent>
//       <UserProfile>
//         <UserAvatar>
//           <FaUser />
//         </UserAvatar>
//         <span>{userInfo?.username}</span>
//       </UserProfile>
//     </Layout>
//   );
// };

// export default HomePage;
