// import React from 'react';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProjects, createProject } from '../api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const NewVersionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProjectList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProjectItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectName = styled.strong`
  font-size: 1.2em;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const HomePage = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError } = useQuery('projects', fetchProjects);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Title>Projects</Title>
      <NewVersionButton onClick={() => setIsModalOpen(true)}>+ New Version</NewVersionButton>
      <ProjectList>
        {data.map((project) => (
          <ProjectItem key={project.id}>
            <ProjectName>{project.name}</ProjectName> ({project.id})
            <EditButton>Edit</EditButton>
          </ProjectItem>
        ))}
      </ProjectList>
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
            <ModalButton onClick={handleCreateProject}>Create</ModalButton>
            <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default HomePage;
