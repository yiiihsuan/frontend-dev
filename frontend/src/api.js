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
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: new URLSearchParams({ username, password }), 
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };