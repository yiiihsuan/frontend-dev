// api.js

const API_URL = 'http://35.206.195.197:8000';
//to add in .env


//create user
// export const createUser = async (username, password) => {
//   const response = await fetch(`${API_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data = await response.json();
//   return data;
// };


export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 更改Content-Type為表單數據
      },
      body: new URLSearchParams({ username, password }), // 使用URLSearchParams來處理form-data
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };


  export const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/projects/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };

  export const createProject = async (projectName) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/projects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ project_name: projectName }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };

  export const uploadFile = async (file, projectId, type) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('type', type);
  
    const response = await fetch(`${API_URL}/upload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };
  