import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import SignUpPage from './pages/SignupPage'; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />
             <Route path="/sign-up" element={<SignUpPage />} />  
            <Route path="/home" element={isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
            <Route path="/project/:projectId" element={isLoggedIn ? <ProjectPage setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/" />} />
            
            
            {/* <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}



export default App;

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
