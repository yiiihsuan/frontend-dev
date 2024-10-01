import React, { createContext, useContext, useState } from 'react';
import { useMutation } from 'react-query';  // 引入 useMutation
import { loginUser } from '../api';  // 假設你有 loginUser API

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  // 使用 react-query 的 useMutation 來處理登入請求
  const loginMutation = useMutation(
    async ({ username, password }) => {
      const data = await loginUser(username, password);  // 調用 login API
      return data;
    },
    {
      onSuccess: (data) => {
        // 成功後處理 token
        const accessToken = data.access_token;
        localStorage.setItem('token', accessToken);
        setIsAuthenticated(true);
      },
      onError: (error) => {
        console.error("Login failed:", error);
      }
    }
  );

  // 包裝成 handleLogin 函數
  const handleLogin = (username, password) => {
    loginMutation.mutate({ username, password });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, loginMutation }}>
      {children}
    </AuthContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useMemo } from 'react';
// import { loginUser } from '../api';  


// const AuthContext = createContext();


// export const useAuth = () => useContext(AuthContext);


// export const AuthProvider = ({ children }) => {
//   const [isLoading, setLoading] = useState(false);
//   const [isError, setError] = useState(false);
//   const [error, setErrorMsg] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return !!localStorage.getItem('token');  
//   });


//   const handleLogin = async ({ username, password }, callback) => {
//     setLoading(true);
//     setError(false);
//     setErrorMsg(null);

//     try {
//       const data = await loginUser(username, password);  
//       localStorage.setItem('token', data.access_token); 
//       setIsAuthenticated(true);
//       setLoading(false);
//       if (callback) callback();  
//     } catch (err) {
//       setError(true);
//       setErrorMsg(err.message || 'An error occurred'); 
//       setLoading(false);
//     }
//   };


//   const handleLogout = (callback) => {
//     localStorage.removeItem('token'); 
//     setIsAuthenticated(false);  
//     if (callback) callback(); 
//   };


//   const value = useMemo(() => ({
//     handleLogin,
//     handleLogout,
//     isLoading,
//     isError,
//     error,
//     isAuthenticated,
//   }), [isLoading, isError, error, isAuthenticated]);

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState } from 'react';
// import { loginUser } from '../api';  

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isLoading, setLoading] = useState(false);
//   const [isError, setError] = useState(false);
//   const [error, setErrorMsg] = useState(null);

//   const handleLogin = async ({ username, password }, callback) => {
//     setLoading(true);
//     setError(false);
//     setErrorMsg(null);

//     try {
//       const data = await loginUser(username, password);
//       localStorage.setItem('token', data.access_token);
//       setLoading(false);
//       if (callback) callback();
//     } catch (err) {
//       setError(true);
//       setErrorMsg(err);
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ handleLogin, isLoading, isError, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
