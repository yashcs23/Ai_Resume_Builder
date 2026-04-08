import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ResumeForm from './pages/ResumeForm';
import ResumeList from './pages/ResumeList';
import ResumeBuilder from './pages/ResumeBuilder';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ResumeList />} />
            <Route path="/create" element={<ResumeForm />} />
            <Route path="/edit/:id" element={<ResumeForm />} />
            <Route path="/resume/:id" element={<ResumeBuilder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
