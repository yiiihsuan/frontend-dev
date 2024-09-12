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

  export const registerUser = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ username, password }), 
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
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
    console.log('file url is', fileUrl)
    
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




// GeneralGSEA API 
export const submitGeneralGSEA = async (projectId, params) => {
  const token = localStorage.getItem('token');

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);


  try {
    const response = await fetch(`${API_URL}/gsea/${projectId}/nodeseq`, {
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
      return mockGeneralGSEAResponse; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockGeneralGSEAResponse; 
  }
};

const mockGeneralGSEAResponse = {
  "enrichment_network_plot.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/enrichment_network_plot.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222120Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=b9cd85546b438fa8ea472a0ef87ab7ab01d40ebe92d064b63dc2135f56afa4291b584a4232efbdf7d3cf7793981a3084200278730812e0e7f813f21215747e490a8a8d58f2051854ae0622c0e4ef92ba4bc9495757b7e4e58e4f221d9dfcc5593507be9defa4969d01058282ab87a3008fbec5efbef38699a14a542eb90b5e8260e62c482a6633c2bcc1358e1c81161bb4774c7e869569a2d71eaedf6a27361112d495035576996703e2a49f5780832412035302bc3dee858e8a53099d038005f741ec42fa41db60df5f3ee1cb0fc2021b7a1c22c0fd4d2dd9bd587c2aa7a9c9564004494900c1344c4bcf7e9404aa2835db9410c74475335e0b27d36fde8d44",
  "enrichment_heatmap.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/enrichment_heatmap.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222123Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=89968dbae4e4c1aa0d1928c8d0614079b44885ce05aa28a6b3a11645abe302c7c81c84fd9d5fdbc7691519a6a094fcf5bc11c8e399fd4a4988ad71ab0ef2a842966e22fb1c917b26a5a93c4eb04c196cbdbe4b2a2cc761065e78aaab1b9276b1c2d60d1f4af98c69fa39f54ca95b3f3ad8914a3e66ee298ab6d586e72ea844fd0a44cc85cd3036df86544b619064db343582722efd669fbde6c6a92bc7d3eadcdd5be80dd33fdb339b9366ea2308319a146a1d6d4e2846d99d6df8699eaf4083ee870d8c595cffab6eb41a2fcab0eafd8ce490712536bb8d89b69bbb8697bfa8588a9651d67fe808a9faaa0db97c80deb99bf0f62faf22815ed70c59ae77ad07",
  "gseaplot_0.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_0.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222125Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=59d43467bd6d34bfe7e9f0c626051fba9036300453d4410ebdccd2bbea538d336f826f7e9cb54e374b882dd5c20520e42411085e7c793abdd54fbd91f518786d067682fe3a433aab81c2db4c778b3f50ab9023ad93be60216e0375041f3f74dc70c4e5ee2175ee71a3c1d125be70ef75acfd4814e5f73625e5e335df837536ab2230c09508b9e04160038f4ed656860b1d22cd28bd23e22bc8cf897e17e0038c464d880d6fbf791339cc77067d8d80717808d23e1873f124a86ff72b5748c85423ff1bbf43e294ce9be71bf8fae60cea950cb606c8147234ddd276cd29c7e095f304c9feb1802693ef14b729c1b8bc51089c3d6d82ec621422d1b38db360af13",
  "gseaplot_1.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_1.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222128Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=dce568ab735955be81f3daac8670fcb37543e953591f1887bd563b5b035643cee5bf33ee86ce2adafb59b9a50481bf36590c3e86fe4612a85d37dfc35d53894ae53566ced8a8c7b551dec3bd600fc35ec959a8cbe5e377759dedacfdf440769ad11e10c1dd05afa4aefa122a7715390f54f5ecf120c0ed099c9a47258e35376fa3c92320b2449d6d1143c53cdfc61715f01231fe9369e8c6427cbd9aa067185b43437760082c712b4e67e071ccd8a953d9db700fb913837309c759ecc2e708e2ec245bf16a88dc2a961f3c640e87f0233b0fabe33b68a04e68db656d07c8ea9c7b15e38f237720e8c7d7480545a7cece28fbca8d76addfe065656d34ae8fe5bf",
  "gseaplot_2.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_2.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222131Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=39712d278969ab554759e240064aac78d031738b39ce08a771e6a66dac0e9265ff6b0a75106c8a16ee86535626de83bab00b3a4e34ace1b1f21faed8b1e280787d480de6068e504df10d61f128d30800348ba3f1dc3a41303e2c5e1733e3555df321918eddb2d603aed5d822ae56eaea3c24cd6f2b0ec87334771027edef14b68088f4c946060d1332dcd6a347d03013dc51ae03648f0473779193b01b9a9e05d34bb6d6b2ffdf9746f67aa90e73c1b5ed25adf05367cc936b350fbe23e065899ba0d5777428010cddd15b44a5fa9629450c010e24e713ae85d25ab6fde11a389f9f5deb0977930d2761218e37db2c06e7f773d981e1097bf4ba5abaa064ca3f",
  "gseaplot_3.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_3.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222134Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=2d382f76e55ed68f861a35035f7b853cdf7e9ab63c09bf9e4a8778e83de6736f083b90e24c3df56c36f2536764599cc3330ca0c445ae201db6025214d1a2d2b8393fb612bbf276317cff7264003309070c3a3506d07cae922c4b22965fa53503f0895a13f01dc490c081ddbb612030b3ef0c2c93cebc61cffb71cb58fa5e56484c8d725e0c34808525c98f67f53d2d416e0ea01a5be4b48e93340fa7e8427c038d6b8361a1b34ef6b348d527c5c9225082833fbb80c19c9a58ecf29fa7618d4637abf9b7228ab7d15f5047bc9e380670fc36f660d28c7d5552420dcd8e3b092c25ab0a3767659fb3d4d2fcbb0a71ffe1350c1263b3309fb5bd19b15a53538030",
  "gseaplot_4.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_4.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222137Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=487e67c9ecc006aa57aa66704fbfafb61224a77baebb606c0598bca1d09bc4c3d9b5cbb4cf98e545ad1fa60f2d80e9ca6e0d58def432ac6896b33432cc535869f6d5bded49776aabf91d7c14f1ea2be4c65cbeda299c86f0b98863e097f322f06f697f6c31781dc60ef887928007362eee08adf7c88d738fab5d62ebbdf9b5b7a4a8dd141be5a01ee4da2c1363f345db45faf03bccd16149db40f6a9a382c611e0872cbae147c30b51a53f6686c48cbbfd74a2a906207d3e2350ef4a64ddc17c6da234a100486ea59beec2ed7cbcb5cec0b161f660aba32ff0479cc0c842ba29ed5cb74be3d4c9aef767c42936aeada53a5158be5b7d6ab3607b19607b0f6ede",
  "gseaplot_5.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_5.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222140Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=3e283738dc9f61a1505a01da868eba791efc2ef7d2512f3f2abfe0100e4b0209856757174ce2e4409dc39fcdadbb8014008ac56e79d47ae0c2908eb12e552bc8aefff04d40d4465e8fe4bba75fe87f1b89b3275ccc2da22ce67fa50a0f798ebdc5fb71519a414e94693bb69f92a6ea6c8df0f7ed7e24195978a49f7cd5492f5ccf7827f7e64530bf28b2479f3b18611ca418e019387a5efbac630a3e5a628754d630f029e816b1f953ae3c414c7d68191e0e62aa19a647d4bc858f56694a4ff4acf01cee2ebea3806eeda58a3071fee43e726f19fe7e48fd460e00e8d1fc89bdd6d93a2ab594db7b464b12b369667d12cab8c513435597219e76804356d2ee87",
  "gseaplot_6.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_6.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222143Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=c6564af4ae9e083e22bf0aa4b4fb1f8f1db58676b64b580a28870f11f11f0b3a3fcf4524567d94c86022f5e7ffbb4e5453ca8dc5e7e293c543ccfd67fd3fe9a29c6a845fb39e48bfcddd1e3774d60363a641e82e70e373f1cf3adc996dd7ee9719d30ddec2e115a09c6488140a09a4fc5b9957751303d1c8191f500dd08ca04fed74676b6b49bc0d45f2c930b154fa66c0991c7aa0a92dd397eca258eaeeadd07f708de8ce1172a283acc4f890d13385c057c7268953419b95c581c39487af48d5d4c9acb244cae8683301f325f279b5c662448d4261672b5ffd18c3f526a5e70c9de275b7e31ffca51a4c1335094d860e90a4cc784481f770f1fa401c8b4f24",
  "gseaplot_7.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_7.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222146Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=0fc0ca0329677dc9d7f4f7ce10ab56ea52a98e7e1668370ab15d5b2ec4f6f90426627b4aacab35eb4eea15f603a8600b7be88c1ccca356ab46aecb8eb44c7971cf1fb055c3f3a3050fc5b8cefdcbadbed1f5587feac9146908a1655b18d6235f83ab9a223bec30f78f6841ea91cf0cd6a0b3a48f482027c0132c997a14a0b7a0b69de1a42eefa778535ea1e8c738e1f43d34024b73fb2a946421ade01701485a9cc799f425f03fd357bde2ae293e3a9b6365fb16f7be911cbcc31ac69219ed4094f0651d54185fe4976c36b1a52cb175eb5fe18d0ff3e19a6fe90debda8d852be21e95b2e659fe9d19f52d45305ce54bf094fe19274860aa0077525a7474a604",
  "gseaplot_8.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_8.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222148Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=8fbfa0035a368fc1868d736a68d6711a812f3ce956ecc272cfdb7f3c0380bd66955c8e1acb18686fa430d1f109640868a33d995dc33199275e6efdb729d3216e7e9b731dc0526f45969b1742dcf1045c2bfc73627a660a5af6ae2264783fb2931b08251e20d97744340e6041415040a14836159fddf26b976e8b20c36d1eafb18b85de6fe21f983e5c85efab92343a5d67cf0c96271e7221ddb9814981d89e1183cdea7d0f5a8275007637c8f65dd353bb174c5b3b2349865848ff61424cd4342147f9faf6a508579d4575d3693a04933b3e59bc7dd4859cad03917c590a2dc9f66dee240911e85563330c2ebd071c0ed0fcc986ec715bb728b9312c619c4e86",
  "gseaplot_9.png": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gsea/gseaplot_9.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240901%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240901T222151Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=c4c56b823f11d36af8f92e1f5bbc5e297061af6f92644c68d54f02c793244efe2ae81eb2e5a2dfdb007c617d0a968a30613fc491ee111f03134ee7139a10d08cd2da4cef7e99f5dad7913e0b09b025f15fccdb5e582f80c1a29df7433092da6c8f847ba130ff7e36d581c9cf0c67613f5b83edda6fe6fb23b892d24fd25df3f4864932a5d6f34adaa16d4d4c5867da727457dba77611f2fb40c15d466f81d22fb200c86a7b03056b578c417c88394adf80ae9a52739b828c3b5f822f8eabf0db4d40e47acd4e796555d6b3abf690e7d7d01933fe3f818afb872bfb01e91029b8c0f36a6c80cfcf3e13f49c13e0f8662db42b4e794669c119804bd9fa64d82642"
}


//submitWGCNA API
export const submitWGCNA = async (projectId, params) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found, unable to submit WGCNA request.');
    return mockWGCNAResponse; 
  }

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/wgcna/${projectId}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful, returning mock response');
      return mockWGCNAResponse; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error); // Will log the complete error object
    return mockWGCNAResponse; 
  }
};

const mockWGCNAResponse =  {
  "WGCNA_gene_set": [
    "UCHL1",
    "HSPA1A",
    "UBC",
    "HSPA1B",
    "SQSTM1",
    "CLU",
    "HSP90AB1",
    "PSMB4",
    "HSPA8",
    "GABARAPL1",
    "FLNC",
    "CYB5R1",
    "SOD1",
    "PSMB7",
    "HSP90AA1",
    "HSPA5",
    "PCBP2",
    "PABPC1",
    "PRDX1",
    "RPS21",
    "BTF3",
    "CALR",
    "UBB",
    "EIF1",
    "ATP6V0C",
    "FTL",
    "RPL39",
    "CRYAB",
    "RNA5-8SN2",
    "NPM1",
    "CXCL12",
    "IGF2",
    "MYL9",
    "CHCHD10",
    "ATP5ME",
    "FHL2",
    "MYL4",
    "FABP3",
    "MYL3",
    "TNNI1",
    "SELENOW",
    "ACTA2",
    "MYL7",
    "TNNI3",
    "TNNC1",
    "NREP",
    "H19",
    "COX7B",
    "MYL2",
    "ACTC1",
    "TPM1",
    "IFITM3",
    "PLN",
    "COX3",
    "TNNT2",
    "ND4",
    "MIF",
    "COL3A1",
    "ATP6",
    "COX1",
    "ACTA2",
    "LGALS1",
    "KRT8",
    "IGFBP7",
    "IGF2",
    "IFITM3",
    "HSPB7",
    "HSPB1",
    "RPL13",
    "RPS6",
    "S100A11",
    "S100A6",
    "HLA-B",
    "H3P6",
    "H3-3A",
    "SELENOW",
    "H19",
    "SERF2",
    "GPX1",
    "GNAS",
    "SERPINE1",
    "RPL8",
    "SPARC",
    "FSTL1",
    "MFGE8",
    "TIMP1",
    "MIF",
    "MYH6",
    "RPS2",
    "PRDX2"
  ],
  "KME_membership_url": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/wgcna/KME_membership.csv?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240902%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240902T062047Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=c8ed4ee96fb164f6d2f3fa97bf77243def5e57be8e32ad7e7ad2eac2d47493f0dbccd8e9cd21da0dada5462d12d21c3c449243c8cf0ddba8bc8b3a1df6c2e1d05cfaa38dbc2e272cb64bca951b9e6c25242ed1428d61cd2a23ffe98de5045cda5832872880d5b6a8c82f701e15bec2391d755bfb085a410837f1fabdcdd2eb15a6cdd49695a9845cf4bff6d2a092e43ed16260c0aa0c40b0aa8b736946bc039fe84ec74c472fb508d2654ba8fc5fd4f445aecbf41d89b11cd1efc811421195387d9c2f545ec328de009ad2aecd6e8d5db5bf25e53c7f5ee579590de3e418a6d7f4b16332d7326db4d370f814d6434965d16f41e3a074772d7059dc76a45c6397"
}




export const submitBaselineSelection = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/feature_selection/${projectId}/baseline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful');
      return mockBaselinSelection; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockBaselinSelection; 
  }
};


const mockBaselinSelection = {
  status: "success",
};



export const submitGeneCollection = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/feature_selection/${projectId}/collect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful');
      return mockGeneCollection; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockGeneCollection; 
  }
};


const mockGeneCollection = {
  status: "success",
};


export const submitGeneSelection = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/feature_selection/${projectId}/select`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful');
      return mockGeneSelection; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockGeneSelection; 
  }
};

const mockGeneSelection = {
  status: "success",
};


// BuildBaseModel API
export const buildBaseModel = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/model/${projectId}/base/train`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

   
    if (!response.ok) {
      console.error('API request not successful');
      return mockBuildBaseModel;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockBuildBaseModel;
  }
};


const mockBuildBaseModel = {
  status: "success",
};



// evaluateBaseModel API
export const evaluateBaseModel = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {

    const response = await fetch(`${API_URL}/model/${projectId}/base/evaluate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      console.error('API request not successful');
      return mockEvaluateBaseModel;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockEvaluateBaseModel;
  }
};


const mockEvaluateBaseModel = {
  "base_ml_r2_plot": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gene_set/static_plots/base_ml_r2_plot.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240904%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240904T205526Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=deacddbbfd62f996b93c24b0451ae23a8c766ad0c6dc1cc341f40e2eb964551696e18f37667e90e58ccfe4d80ed713f2ad61f1bf2dd16649ae2f7f59af0f546c04b1a4da6d974852cdc08756bf4a3d6fccebc054f067beafc392dea72023bd31b2b899927b34c2dcbf5a1fcaaa5895a03bcc4563cae211a83fee95121df9950a92478dd790c777e226f2b4980e8baecf104128bad8112f5ccbcdafe25f20d5c0758a1752760b4b7b97a225a9fe9f65318d2a058e9c86f422c08309dafaa770b147040d7c52cfad0c9099fbbbf16384117e59a80d0ef0b87c7f64468aa6e5a22d1a64dc3c127b33c87e068ac122f25c90e10320305c822742a626e45f91895a24",
  "base_ml_abs_error_plot": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gene_set/static_plots/base_ml_abs_error_plot.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240904%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240904T205526Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=33e6a08af192c9e4406b5dcf6e3e49e5644ff47a63c7933405a1519d27bc6ae5d397a8839a7cda855c676797b9353375aae7e82328093ea58060e73f87c4329d7cc94d76da1fd8a3f2041e38ee45b5f306d8fdb02b79ed2870c43e64ba86c8af1e7812024f049e2c3cb6ffc440ca18d9f673e2f729927fe5688e5edef5c2f31cd1a78054adf61c84ec2a8a105e0b5a11c69534b6a3e52870c0b071d7ca2f2ac1dbc6897b81daec7ae7785056eb6d8e47e0c933736728ad306bca9597c378d172267ba1b6c5e1a4f2d8103fb4e02572195ce1d00340a2cc606dec2d9f39ba43ea0b083abede7a24a13d578bab016711f798c862e6ca8569dfda3539287cdbb790"
};


// trainMlpModel API
export const trainMlpModel = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params); 
  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(`${API_URL}/model/${projectId}/mlp/train`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json',  
      },
      body: requestBody,  
    });

    if (!response.ok) {
      console.error('API request not successful');
      return mockTrainMlpModel; 
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockTrainMlpModel; 
  }
};

const mockTrainMlpModel = {
  status: "success", 
};

// evaluateMlpModel API
export const evaluateMlpModel = async (projectId, params) => {
  const token = localStorage.getItem('token'); // 从 localStorage 中获取 token

  const requestBody = JSON.stringify(params); // 将请求体转为 JSON 字符串
  console.log('Sending request with body:', requestBody);

  try {
    // 发送 POST 请求进行 MLP 模型评估
    const response = await fetch(`${API_URL}/model/${projectId}/mlp/evaluate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  // 使用 token 进行认证
        'Content-Type': 'application/json',  // 指定内容类型为 JSON
      },
      body: requestBody,  // 包含请求参数的 JSON 字符串
    });


    if (!response.ok) {
      console.error('API request not successful');
      return mockEvaluateMlpModelResponse;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return mockEvaluateMlpModelResponse; 
  }
};



// Chained API function for Base Model and Evaluate Model
export const trainAndEvaluateBaseModel = async (projectId, params) => {
  const token = localStorage.getItem('token'); 

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    // First API call to build the base model
    const buildResponse = await fetch(`${API_URL}/model/${projectId}/base/train`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!buildResponse.ok) {
      console.error('Build base model request not successful');
      return mockBuildBaseModel;
    }

    const buildData = await buildResponse.json();
    console.log('Base model built successfully:', buildData);

    const evaluateResponse = await fetch(`${API_URL}/model/${projectId}/base/evaluate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody, // Reuse the same request body if the params are similar
    });

    if (!evaluateResponse.ok) {
      console.error('Evaluate base model request not successful');
      return mockEvaluateBaseModel;
    }

    const evaluateData = await evaluateResponse.json();
    console.log('Base model evaluated successfully:', evaluateData);

    return {
      buildData,
      evaluateData
    };
  } catch (error) {
    console.error('Error:', error.message);
    return mockEvaluateBaseModel; 
  }
};



// Chained API function for training and evaluating MLP model
export const trainAndEvaluateMlpModel = async (projectId, params) => {
  const token = localStorage.getItem('token');

  const requestBody = JSON.stringify(params);
  console.log('Sending request with body:', requestBody);

  try {
    // First API call to train the MLP model
    const trainResponse = await fetch(`${API_URL}/model/${projectId}/mlp/train`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!trainResponse.ok) {
      console.error('MLP model training request not successful');
      return mockTrainMlpModel;
    }

    const trainData = await trainResponse.json();
    console.log('MLP model trained successfully:', trainData);

    // After successful training, call the evaluate API
    const evaluateResponse = await fetch(`${API_URL}/model/${projectId}/mlp/evaluate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,  // Reuse the same request body if params are similar
    });

    if (!evaluateResponse.ok) {
      console.error('MLP model evaluation request not successful');
      return mockEvaluateMlpModelResponse;
    }

    const evaluateData = await evaluateResponse.json();
    console.log('MLP model evaluated successfully:', evaluateData);

    // Return both train and evaluate data, or just evaluate data if you prefer
    return {
      trainData,
      evaluateData,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return mockEvaluateMlpModelResponse;
  }
};

const mockEvaluateMlpModelResponse = {
  "ml_r2_plot": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gene_set/static_plots/MLP_r2_plot.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240904%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240904T205929Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=1b946748b80792be2e34745dedb81f7437b4bd2bb7d61e1238f3dc768409d1601ce16f2c24f0e815bff1a09d372893dc3fec67d89bf83c57345277f0e203d1e1b53992deb9d73fe07874d8890f63e68a83d5888bfa7f648044670fc1f04d386753a81cee12a539077faa9a72087cedeccb9c238ce980438227e6945e94e685aba0916e185cc9f319b0df2b630f7b1bf2633fec145b1457b2dbdb873fd6b8c9539184895ea0ab96f0c1849c42d38f289aff290cd9ebecda758868b45396bdb98a5615095a0d39eb9efc8c1569a56e0ceecdccd7a2de7228aedf81eb13dabe7d52884266e4f84770a8dc9b59aa99bfb6da2219bcb256b50e4495fb484841d5cac7",
  "ml_abs_error_plot": "https://storage.googleapis.com/genenet-genex-features/669dbe9907b7c62caa476c92/gene_set/static_plots/MLP_abs_error_plot.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=genenet-genex-features%40genenet.iam.gserviceaccount.com%2F20240904%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240904T205929Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=5be02fd53b5d00adcb0731b197760f9bbb9952eff5e184720ff6e08851c31fa58810597f768b8c5f2a8f0e5523d09969e603f69bd7c541dfcd3e5a6b9613a00fd723da66aabc5382ce61429286fb567d1d83d305fe12c19784042a20d94e6be8ca09a908011c5a4ec1bf3e1d2462081f13118b48a4512a7f698ecd2f26f57946a094416f33230ae21232ca4338712dc5bf8c56f5e8bf35fffbcdbb3b524513edd8b15e8fb5df01e20c1148b78329742f62681c259a6a57104104e05cb643414719a304348816c509f5e7842c164f79c12f1912713e2606369a149e84c6b0e66cc68d6f0e2e5578f7e9ef6b4049ea4e59e3eeb4a00d92faa26faa50ecbc5efe74"
};




export const runReactomeAndStatus = async (projectId, interval = 5000) => {
  const token = localStorage.getItem('token');

  const mockreactomeData = 
    {
      "task_id": "9ff94536-2e4a-4553-8222-2c1a5a24b121",
      "task_status": "IN_PROGRESS",
      "task_info": {
        "done": 4,
        "total": 12,
        "detail": "Exporting dmso_vs_nitrendipine reports"
      }
    }
  ;

  try {
    const response = await fetch(`${API_URL}/deseq/${projectId}/reactome/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Failed to start task. Status: ${response.status}`);
    }

    const { task_id } = await response.json();  
    console.log(`Task started with ID: ${task_id}`);

    const checkTaskStatus = async () => {
      const statusResponse = await fetch(`${API_URL}/deseq/${projectId}/reactome/${task_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!statusResponse.ok) {
        throw new Error(`Failed to fetch task status. Status: ${statusResponse.status}`);
      }

      const statusData = await statusResponse.json();

      if (statusData.task_status === 'SUCCESS') {
        console.log('Task completed successfully:', statusData);
        return statusData;  
      } else if (statusData.task_status === 'FAILED') {
        console.log('Task failed:', statusData);
        throw new Error('Task failed');
      } else {
        console.log(`Task status: ${statusData.task_status}, Progress: ${statusData.task_info?.done || 0} / ${statusData.task_info?.total || 'unknown'}`);

        await new Promise(resolve => setTimeout(resolve, interval));
        return checkTaskStatus();  // 遞迴再次檢查
      }
    };

    // 開始檢查任務狀態
    return await checkTaskStatus();

  } catch (error) {
    console.error('API Error:', error.message);
    console.log('Returning mock data due to error.');
    return mockreactomeData;  // 返回 mockData 以替代真實 API 數據
  }
};






  