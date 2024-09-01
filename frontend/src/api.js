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
      const errorResponse = await response.text();
      throw new Error('Network response was not ok. Details: ' + errorResponse);
    }
  
    const data = await response.json();
    return data;
  };




  export const uploadFile = async ({ file, projectId, type }) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('project_id', projectId);
    formData.append('ftype', type);

    console.log('Uploading', { file: file.name, projectId, type });
  
    const response = await fetch(`${API_URL}/upload/store_and_backup?project_id=${projectId}`, {
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

  export const getProjects = async () => {
    const token = localStorage.getItem('token'); 
    const response = await fetch('/projects/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
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
// export const submitDeseqGSEA= async (projectId, params) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Submitting DESeq2 analysis with params:", params);
//       // 返回假的响应数据
//       resolve(mockResponse);
//     }, 2000); 
//   });
// };

// DESeq2GSEA API 
export const submitDeseqGSEA = async (projectId, params) => {
  const token = localStorage.getItem('token');

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);


  try {
    const response = await fetch(`${API_URL}/gsea/${projectId}/deseq`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',  
      },
      //body: JSON.stringify(params),
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful, returning mock response');
      return mockResponse; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockResponse; 
  }
};

const mockResponse = {
  "kegg_dotplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/kegg_dotplot.png",
  "gene_set_barplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/gene_set_barplot.png",
  "kegg_2021_human_dotplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/kegg_2021_human_dotplot.png",
  "kegg_2021_human_barplot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/deseq/kegg_2021_human_barplot.png"
};



// DESeq2Stats API
export const submitDeseqStats = async (projectId) => {
  const token = localStorage.getItem('token');
  
  try {
    // Send POST request to start the stats calculation
    const postResponse = await fetch(`${API_URL}/deseq/${projectId}/stats/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    if (!postResponse.ok) {
      console.error('API request not successful during POST, returning mock response');
      return mockResponse; 
    }

    const jsonResponse = await postResponse.json();
    const fileUrl = jsonResponse.result._url;
    
    // Fetch the CSV data using the URL provided in the response
    const getResponse = await fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    if (!getResponse.ok) {
      throw new Error(`HTTP error during GET! Status: ${getResponse.status}`);
    }

    const csvData = await getResponse.text();
    
    // Return the raw CSV data or parsed data as needed
    return csvData;
    
  } catch (error) {
    console.error('Error:', error.message);
    return mockgResponse; 
  }
};



const mockstatsResponse = {
  "result": {
    "_url": "http://35.206.195.197:8000/deseq/669dbe9907b7c62caa476c92/stats/file/"
  }
}
  

// Mock response for demonstration purposes
const mockgResponse = [
  { "gene": "Gene1", "value": 10 },
  { "gene": "Gene2", "value": 20 }
];

  

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


// Reactome API
export const submitReactome = async (projectId, params) => {
  const token = localStorage.getItem('token');
  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/deseq/${projectId}/reactome/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful, returning mock response');
      return mockReactomeResponse; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockReactomeResponse; 
  }
};

// Mock response for demonstration purposes
const mockReactomeResponse = {
  task_id: "1d93152c-8a13-4c41-85db-303d9709c5f2", 
};
  