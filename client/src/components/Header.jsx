import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaHome } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>🚀 AI Resume Builder</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            <FaHome /> My Resumes
          </Link>
          <Link to="/create" className="nav-link primary">
            <FaPlus /> Create New
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
