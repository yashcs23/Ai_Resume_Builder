import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>🚀 AI Resume Builder</h1>
        </Link>
        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">
                <FaHome /> My Resumes
              </Link>
              <Link to="/create" className="nav-link primary">
                <FaPlus /> Create New
              </Link>
              <div className="user-section">
                <span className="user-name">
                  <FaUser /> {user?.name}
                </span>
                <button onClick={handleLogout} className="logout-link">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link-auth">
                Login
              </Link>
              <Link to="/signup" className="nav-link primary-auth">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
