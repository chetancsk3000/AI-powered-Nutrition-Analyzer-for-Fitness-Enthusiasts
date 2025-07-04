import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Home"
import './App.css'
import Signup from './Signup';
import Login from './Login';
import PredictPage from './PredictPage'
import History from './History';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
