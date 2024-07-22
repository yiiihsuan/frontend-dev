// import React from 'react';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import { useQuery } from 'react-query';
import { fetchProjects } from '../api';  
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

const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery('projects', fetchProjects);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Title>Projects</Title>
      <NewVersionButton>+ New Version</NewVersionButton>
      <ProjectList>
        {data.map((project) => (
          <ProjectItem key={project.id}>
            <ProjectName>{project.name}</ProjectName> ({project.id})
            <EditButton>Edit</EditButton>
          </ProjectItem>
        ))}
      </ProjectList>
    </Container>
  );
};

export default HomePage;
