import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaHome } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🤖</span>
          <h1>AI Resume Builder</h1>
        </Link>
        
        <nav className="header-nav-center">
          <a href="#features" className="nav-link">Features</a>
          <a href="#templates" className="nav-link">Templates</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </nav>

        <nav className="header-nav-right">
          <Link to="/dashboard" className="nav-link">Log In</Link>
          <Link to="/create" className="nav-link btn-signup">Sign Up Free</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
