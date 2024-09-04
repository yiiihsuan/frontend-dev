
// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { fetchProjects, createProject } from '../api';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 2em;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const NewVersionButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-bottom: 20px;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ProjectList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const ProjectItem = styled.li`
//   background-color: #f9f9f9;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 10px;
//   margin-bottom: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const ProjectName = styled(Link)`
//   font-size: 1.2em;
//   color: #333;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const EditButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
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
// `;

// const ModalTitle = styled.h2`
//   margin-top: 0;
// `;

// const ModalInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const ModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const { data, error, isLoading, isError } = useQuery('projects', fetchProjects);

//   const [isModalOpen, setIsModalOpen] = useState(false);
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

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <Container>
//       <Title>Projects</Title>
//       <NewVersionButton onClick={() => setIsModalOpen(true)}>+ New Version</NewVersionButton>
//       <ProjectList>
//         {data.map((project) => (
//           <ProjectItem key={project.id}>
//             <ProjectName to={`/project/${project.id}`}>{project.project_name}</ProjectName> ({project.id})
//             <EditButton>Edit</EditButton>
//           </ProjectItem>
//         ))}
//       </ProjectList>
//       {isModalOpen && (
//         <Modal>
//           <ModalContent>
//             <ModalTitle>Create New Project</ModalTitle>
//             <ModalInput
//               type="text"
//               placeholder="Project Name"
//               value={newProjectName}
//               onChange={(e) => setNewProjectName(e.target.value)}
//             />
//             <ModalButton onClick={handleCreateProject}>Create</ModalButton>
//             <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
//           </ModalContent>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default HomePage;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaPlus } from 'react-icons/fa';

// const Layout = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Sidebar = styled.div`
//   width: 200px;
//   background-color: #333;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
// `;

// const SidebarItem = styled(Link)`
//   color: white;
//   text-decoration: none;
//   margin-bottom: 20px;
//   font-size: 1.2em;
//   &:hover {
//     text-decoration: underline;
//   }
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
// `;

// const ModalTitle = styled.h2`
//   margin-top: 0;
// `;

// const ModalInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const ModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const HomePage = () => {
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       name: 'Project 1',
//       tasks: ['deseq2 statics...', 'deseq2 GSEA', '..........']
//     },
//     {
//       id: 2,
//       name: 'Project 2',
//       tasks: ['modeling', '........', '..........']
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newProjectName, setNewProjectName] = useState('');

//   const handleAddProject = () => {
//     setIsModalOpen(true);
//   };

//   const handleCreateProject = () => {
//     const newProject = {
//       id: projects.length + 1,
//       name: newProjectName,
//       tasks: ['New Task 1', 'New Task 2', 'New Task 3']
//     };
//     setProjects([...projects, newProject]);
//     setIsModalOpen(false);
//     setNewProjectName('');
//   };

//   return (
//     <Layout>
//       <Sidebar>
//         <SidebarItem to="/">Home</SidebarItem>
//         <SidebarItem to="/profile">Profile</SidebarItem>
//         <SidebarItem to="/settings">Settings</SidebarItem>
//         <SidebarItem to="/logout">Logout</SidebarItem>
//       </Sidebar>
//       <MainContent>
//         <Title>Projects</Title>
//         <ProjectGrid>
//           <AddProjectCard onClick={handleAddProject}>
//             <FaPlus />
//           </AddProjectCard>
//           {projects.map((project) => (
//             <ProjectCard key={project.id}>
//               <ProjectName>{project.name}</ProjectName>
//               <TaskList>
//                 {project.tasks.map((task, index) => (
//                   <TaskItem key={index}>
//                     <TaskCheckbox />
//                     {task}
//                   </TaskItem>
//                 ))}
//               </TaskList>
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
//               <ModalButton onClick={handleCreateProject}>Create</ModalButton>
//               <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
//             </ModalContent>
//           </Modal>
//         )}
//       </MainContent>
//     </Layout>
//   );
// };

// export default HomePage;







// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaPlus } from 'react-icons/fa';

// const Layout = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Sidebar = styled.div`
//   width: 80px; /* Sidebar的初始宽度 */
//   background-color: #333;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
//   transition: width 0.3s;

//   &:hover {
//     width: 200px; /* 滑鼠移動到Sidebar時展開 */
//   }
// `;

// const SidebarItem = styled(Link)`
//   color: white;
//   text-decoration: none;
//   margin-bottom: 20px;
//   font-size: 1.2em;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   width: 100%;

//   & > span {
//     margin-left: 10px;
//     display: ${(props) => (props.isOpen ? 'inline' : 'none')};
//   }

//   &:hover {
//     text-decoration: underline;
//   }
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
// `;

// const ModalTitle = styled.h2`
//   margin-top: 0;
// `;

// const ModalInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const ModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const HomePage = () => {
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       name: 'Project 1',
//       tasks: ['deseq2 statics...', 'deseq2 GSEA', '..........']
//     },
//     {
//       id: 2,
//       name: 'Project 2',
//       tasks: ['modeling', '........', '..........']
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newProjectName, setNewProjectName] = useState('');

//   const handleAddProject = () => {
//     setIsModalOpen(true);
//   };

//   const handleCreateProject = () => {
//     const newProject = {
//       id: projects.length + 1,
//       name: newProjectName,
//       tasks: ['New Task 1', 'New Task 2', 'New Task 3']
//     };
//     setProjects([...projects, newProject]);
//     setIsModalOpen(false);
//     setNewProjectName('');
//   };

//   return (
//     <Layout>
//       <Sidebar>
//         <SidebarItem to="/">
//           <FaPlus />
//           <span>Home</span>
//         </SidebarItem>
//         <SidebarItem to="/profile">
//           <FaPlus />
//           <span>Profile</span>
//         </SidebarItem>
//         <SidebarItem to="/settings">
//           <FaPlus />
//           <span>Settings</span>
//         </SidebarItem>
//         <SidebarItem to="/logout">
//           <FaPlus />
//           <span>Logout</span>
//         </SidebarItem>
//       </Sidebar>
//       <MainContent>
//         <Title>Projects</Title>
//         <ProjectGrid>
//           <AddProjectCard onClick={handleAddProject}>
//             <FaPlus />
//           </AddProjectCard>
//           {projects.map((project) => (
//             <ProjectCard key={project.id}>
//               <ProjectName>{project.name}</ProjectName>
//               <TaskList>
//                 {project.tasks.map((task, index) => (
//                   <TaskItem key={index}>
//                     <TaskCheckbox />
//                     {task}
//                   </TaskItem>
//                 ))}
//               </TaskList>
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
//               <ModalButton onClick={handleCreateProject}>Create</ModalButton>
//               <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
//             </ModalContent>
//           </Modal>
//         )}
//       </MainContent>
//     </Layout>
//   );
// };

// export default HomePage;



//新增上左邊欄位可以展開
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaPlus, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

// const Layout = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Sidebar = styled.div`
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
//   font-size: 1.2em;
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
// `;

// const ModalTitle = styled.h2`
//   margin-top: 0;
// `;

// const ModalInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const ModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const HomePage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       name: 'Project 1',
//       tasks: ['deseq2 statics...', 'deseq2 GSEA', '..........']
//     },
//     {
//       id: 2,
//       name: 'Project 2',
//       tasks: ['modeling', '........', '..........']
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newProjectName, setNewProjectName] = useState('');

//   const handleAddProject = () => {
//     setIsModalOpen(true);
//   };

//   const handleCreateProject = () => {
//     const newProject = {
//       id: projects.length + 1,
//       name: newProjectName,
//       tasks: ['New Task 1', 'New Task 2', 'New Task 3']
//     };
//     setProjects([...projects, newProject]);
//     setIsModalOpen(false);
//     setNewProjectName('');
//   };

//   return (
//     <Layout>
//       <Sidebar
//         onMouseEnter={() => setIsOpen(true)}
//         onMouseLeave={() => setIsOpen(false)}
//         isOpen={isOpen}
//       >
//         <SidebarItem to="/" isOpen={isOpen}>
//           <FaHome />
//           <span>Home</span>
//         </SidebarItem>
//         <SidebarItem to="/profile" isOpen={isOpen}>
//           <FaUser />
//           <span>Profile</span>
//         </SidebarItem>
//         <SidebarItem to="/settings" isOpen={isOpen}>
//           <FaCog />
//           <span>Settings</span>
//         </SidebarItem>
//         <SidebarItem to="/logout" isOpen={isOpen}>
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </SidebarItem>
//       </Sidebar>
//       <MainContent>
//         <Title>Projects</Title>
//         <ProjectGrid>
//           <AddProjectCard onClick={handleAddProject}>
//             <FaPlus />
//           </AddProjectCard>
//           {projects.map((project) => (
//             <ProjectCard key={project.id}>
//               <ProjectName>{project.name}</ProjectName>
//               <TaskList>
//                 {project.tasks.map((task, index) => (
//                   <TaskItem key={index}>
//                     <TaskCheckbox />
//                     {task}
//                   </TaskItem>
//                 ))}
//               </TaskList>
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
//               <ModalButton onClick={handleCreateProject}>Create</ModalButton>
//               <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
//             </ModalContent>
//           </Modal>
//         )}
//       </MainContent>
//     </Layout>
//   );
// };

// export default HomePage;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaPlus, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

// const Layout = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Sidebar = styled.div`
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
//   font-size: 1.2em;
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
//   justify-content: center; /* Vertically centers the content */
//   height: 300px; /* You can adjust this height to fit your design */
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
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
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

// const HomePage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       name: 'Project 1',
//       tasks: ['deseq2 statics...', 'deseq2 GSEA', '..........']
//     },
//     {
//       id: 2,
//       name: 'Project 2',
//       tasks: ['modeling', '........', '..........']
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newProjectName, setNewProjectName] = useState('');

//   const handleAddProject = () => {
//     setIsModalOpen(true);
//   };

//   const handleCreateProject = () => {
//     const newProject = {
//       id: projects.length + 1,
//       name: newProjectName,
//       tasks: ['New Task 1', 'New Task 2', 'New Task 3']
//     };
//     setProjects([...projects, newProject]);
//     setIsModalOpen(false);
//     setNewProjectName('');
//   };

//   const handleCloseModal = (e) => {
//     // Close modal if the user clicks outside of the modal content
//     if (e.target.id === 'modalBackground') {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <Layout>
//       <Sidebar
//         onMouseEnter={() => setIsOpen(true)}
//         onMouseLeave={() => setIsOpen(false)}
//         isOpen={isOpen}
//       >
//         <SidebarItem to="/" isOpen={isOpen}>
//           <FaHome />
//           <span>Home</span>
//         </SidebarItem>
//         <SidebarItem to="/profile" isOpen={isOpen}>
//           <FaUser />
//           <span>Profile</span>
//         </SidebarItem>
//         <SidebarItem to="/settings" isOpen={isOpen}>
//           <FaCog />
//           <span>Settings</span>
//         </SidebarItem>
//         <SidebarItem to="/logout" isOpen={isOpen}>
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </SidebarItem>
//       </Sidebar>
//       <MainContent>
//         <Title>Projects</Title>
//         <ProjectGrid>
//           <AddProjectCard onClick={handleAddProject}>
//             <FaPlus />
//           </AddProjectCard>
//           {projects.map((project) => (
//             <ProjectCard key={project.id}>
//               <ProjectName>{project.name}</ProjectName>
//               <TaskList>
//                 {project.tasks.map((task, index) => (
//                   <TaskItem key={index}>
//                     <TaskCheckbox />
//                     {task}
//                   </TaskItem>
//                 ))}
//               </TaskList>
//             </ProjectCard>
//           ))}
//         </ProjectGrid>
//         {isModalOpen && (
//           <Modal id="modalBackground" onClick={handleCloseModal}>
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
//     </Layout>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { FaPlus, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { getUserInfo, fetchProjects } from '../api'; 
import { createProject } from '../api';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar'; 


const Layout = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

// const Sidebar = styled.div`
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
//   font-size: 1.2em;
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
  justify-content: center; /* Vertically centers the content */
  height: 300px; /* You can adjust this height to fit your design */
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
  background-color: #b3b3b3;
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
  font-size: 1.5em; /* Adjust font size to scale the icon */
  margin-right: 10px;
  color: #333; /* Set icon color */
`;



const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: projects, error, isLoading, isError } = useQuery('projects', fetchProjects);
  const { data: userInfo } = useQuery('userInfo', getUserInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');


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
      <Sidebar isOpen={false} setIsOpen={() => {}} />
      <MainContent>
        <Title>Projects</Title>
        <ProjectGrid>
          <AddProjectCard onClick={() => setIsModalOpen(true)}>
            <FaPlus />
          </AddProjectCard>
          {projects.map((project) => (
            // <ProjectCard key={project.id} onClick={() => navigate(`/project/${project.id}`)}>
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














// const HomePage = () => {

//   const navigate = useNavigate();

//   const handleProjectClick = (projectId) => {
//     navigate(`/project/${projectId}`);
//   };


//   const [isOpen, setIsOpen] = useState(false);

//   const [projects, setProjects] = useState([]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newProjectName, setNewProjectName] = useState('');
//   const [username, setUsername] = useState('Admin'); // Default username is 'Admin'
  

//   useEffect(() => {
//     const fetchUserInfoAndProjects = async () => {
//       try {
//         const userInfo = await getUserInfo();
//         setUsername(userInfo.username); 

//         const projectsData = await fetchProjects();
//         setProjects(projectsData || []); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUserInfoAndProjects();
//   }, []);

//   const handleAddProject = () => {
//     setIsModalOpen(true);
//   };

//   // const handleCreateProject = async () => {
//   //   try {
//   //     const newProject = await createProject(newProjectName);
//   //     setProjects([...projects, {
//   //       id: newProject.id, // Assuming the response contains the new project's ID
//   //       name: newProject.project_name, // Assuming the response contains the project name
//   //      // tasks: [], // Initialize with no tasks
//   //     }]);
//   //   } catch (error) {
//   //     console.error('Error creating project:', error);
  
//   //     // Fallback project if API call fails
//   //     const fallbackProject = {
//   //       id: projects.length + 1, // Generate a new ID based on the existing projects
//   //       name: newProjectName || 'Untitled Project', // Use the entered name or a default one
//   //       tasks: [], // Initialize with no tasks
//   //     };
  
//   //     setProjects([...projects, fallbackProject]);
//   //   } finally {
//   //     setIsModalOpen(false);
//   //     setNewProjectName('');
//   //   }
//   // };

//   const handleCreateProject = async () => {
//     try {
//       const newProjectData = {
//         project_name: newProjectName, 
//       };
      
//       const response = await createProject(newProjectData); 
//       const newProject = response.project; 
  
//       setProjects([...projects, newProject]);
//     } catch (error) {
//       console.error('Error creating project:', error);
  
//       if (error.response && error.response.data) {
//         console.error('Server response:', error.response.data);
//       }
//     } finally {
//       setIsModalOpen(false);
//       setNewProjectName('');
//     }
//   };


//   const handleCloseModal = (e) => {
//     if (e.target.id === 'modalBackground') {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <Layout>
//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//       <MainContent>
//         <Title>Projects</Title>
//         <ProjectGrid>
//           <AddProjectCard onClick={handleAddProject}>
//             <FaPlus />
//           </AddProjectCard>
//           {projects.map((project) => (
//             // <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
//             //   <ProjectName>{project.name}</ProjectName>
//             //   {/* <TaskList>
//             //     {project.tasks.map((task, index) => (
//             //       <TaskItem key={index}>
//             //         <TaskCheckbox />
//             //         {task}
//             //       </TaskItem>
//             //     ))}
//             //   </TaskList> */}
//             // </ProjectCard>
//             <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
//             <ProjectName>{project.project_name}</ProjectName>
//             <p>Project ID: {project.id}</p>
//           </ProjectCard>
//           ))}
//         </ProjectGrid>
//         {isModalOpen && (
//           <Modal id="modalBackground" onClick={handleCloseModal}>
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
//   <UserAvatar>
//     <FaUser />
//   </UserAvatar>
//   <span>{username}</span>
// </UserProfile>
//     </Layout>
//   );
// };

// export default HomePage;
