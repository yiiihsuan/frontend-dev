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




  export const uploadFile = async (file, projectId, type, useGCP = false) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('type', type);
  
    const response = await fetch(`${API_URL}/upload/store_and_backup`, {
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
  



  export const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/auth/users/me/`, {
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


  // DESeq2 API 
  export const submitDeseq2 = async (projectId, params) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/deseq/${projectId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(params),  
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  };

  // export const submitDeseq2 = async (projectId, params) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("Submitting DESeq2 analysis with params:", params);
  //       resolve({ status: "success", data: params });
  //       // 如果你想模拟失败，可以用 reject(new Error("Failed to submit"));
  //     }, 2000); 
  //   });
  // };

//submitDeseqGSEA
export const submitDeseqGSEA= async (projectId, params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Submitting DESeq2 analysis with params:", params);
      // 返回假的响应数据
      resolve(mockResponse);
    }, 2000); 
  });
};


const mockResponse = {
  "kegg_dotplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/kegg_dotplot.png",
  "gene_set_barplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/gene_set_barplot.png",
  "kegg_2021_human_dotplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/kegg_2021_human_dotplot.png",
  "kegg_2021_human_barplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/kegg_2021_human_barplot.png"
};
  
  

// export const runDeseq = (projectId, params) => {
//   return axios.post(`/deseq/${projectId}/`, params);
// };


//preprocess
export const fetchPlotData = async (projectId, plotType, params) => {
  const response = await fetch(`${API_URL}/preprocess/${projectId}/plots/${plotType}`, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
  