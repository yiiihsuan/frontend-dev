import './App.css';
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignupPage';
import ProjectPage from './pages/ProjectPage';
import LoginPage2 from './pages/LoginPage2';
import Document from './pages/Document';
import { AuthProvider } from './context/AuthContext';  
import PrivateRoute from './PrivateRoute';  

function App() {
  return (
    <AuthProvider>
      <Router>
      <RouteChangeHandler />
        <Routes>
        <Route path="/loginew" element={<LoginPage2 />} />
          <Route path="/" element={<LoginPage2 />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/document"
            element={
              <PrivateRoute>
                <Document />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <PrivateRoute>
                <ProjectPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const RouteChangeHandler = () => {
  const location = useLocation();

  const clearLocalStorageResults = () => {
    localStorage.removeItem('Deseq2Result');
    localStorage.removeItem('Deseq2 GSEAResult');
    localStorage.removeItem('Deseq2 StatisticsResult');
    localStorage.removeItem('Gene CollectionResult');
    localStorage.removeItem('Gene SelectionResult');
    localStorage.removeItem('General GSEAResult');
    localStorage.removeItem('WGCNAResult');
    localStorage.removeItem('Base ModelResult');
    localStorage.removeItem('MLP ModelResult');
    localStorage.removeItem('Base ModelResult');
    localStorage.removeItem('Reactome ResultResult');
    localStorage.removeItem('Baseline SelectionResult');
    localStorage.removeItem('projectId');
    console.log('LocalStorage cleared.');
  };

  useEffect(() => {
    if (!location.pathname.includes('/project/')) {
      clearLocalStorageResults();
    }
  }, [location]);

  return null;
};


export default App;



// import './App.css';

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import HomePage from './pages/HomePage';
// import ProjectPage from './pages/ProjectPage';
// import SignUpPage from './pages/SignupPage'; 
// import Sidebar from './components/SideBar'; 



// function App() {
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // const handleLogin = () => {
//   //   setIsLoggedIn(true);
//   // };
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     const savedLoggedIn = localStorage.getItem('isLoggedIn');
//     return savedLoggedIn === 'true'; 
//   });

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem('isLoggedIn', 'true'); 
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('isLoggedIn'); 
//     localStorage.removeItem('token'); 
//   };


//   return (
//     <Router>
//       <div>
//         <Routes>
//             <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />
//              <Route path="/sign-up" element={<SignUpPage />} />  
//             <Route path="/home" element={isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
//             <Route path="/project/:projectId" element={isLoggedIn ? <ProjectPage setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }



// export default App;

// import './App.css';
// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProjectPage from './pages/ProjectPage';
// import LoginPage from './pages/LoginPage';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 管理登入狀態

//   // 處理登入
//   const handleLogin = (isAuthenticated) => {
//     setIsLoggedIn(isAuthenticated);
//   };

//   return (
//     <div className="App">
//       <Routes>
//         {/* 登入狀態時，重定向到 /home；否則顯示 LoginPage */}
//         <Route 
//           path="/" 
//           element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} 
//         />
        
//         {/* 只有登入狀態才能訪問 HomePage，否則重定向到登錄頁 */}
//         <Route 
//           path="/home" 
//           element={isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
//         />
        
//         {/* 只有登入狀態才能訪問 ProjectPage，否則重定向到登錄頁 */}
//         <Route 
//           path="/project/:projectId" 
//           element={isLoggedIn ? <ProjectPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;
