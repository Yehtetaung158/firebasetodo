// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import SignUp from './components/SignUp';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={< UserProfilePage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
