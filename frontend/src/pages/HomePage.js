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
import { fetchProjects } from '../api';  // 导入 fetchProjects 函数

const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery('projects', fetchProjects);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <button>+ New Version</button>
      <ul>
        {data.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> ({project.id}) <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

