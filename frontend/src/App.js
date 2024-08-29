import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';


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
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/project/:projectId" element={isLoggedIn ? <ProjectPage /> : <Navigate to="/" />} />
            
            
            {/* <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}



export default App;
