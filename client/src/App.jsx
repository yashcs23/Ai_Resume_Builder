import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResumeForm from './pages/ResumeForm';
import ResumeList from './pages/ResumeList';
import ResumeBuilder from './pages/ResumeBuilder';
import './styles/App.css';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('App mounted successfully');
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ResumeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <ResumeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <ResumeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/builder/:id"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
