import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}


{/* <Route path="/nestory" element={<NewStory />} />
<Route path="/book" element={<ShowPage />} />
<Route path="/" element={<Start />} />
  <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
  <Route
    path="/home"
    element={isLoggedIn ? <NewNewHomePage /> : <Navigate to="/login" />}
  /> */}

export default App;
