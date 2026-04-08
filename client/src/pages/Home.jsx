import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-badge">
          ✨ AI-Powered Resume Creation
        </div>
        
        <h1 className="hero-title">
          Build Your Resume with <span className="hero-highlight">AI in Minutes</span>
        </h1>
        
        <p className="hero-subtitle">
          Create ATS-friendly, professional resumes effortlessly using advanced AI. Get hired faster with perfectly tailored content.
        </p>
        
        <div className="hero-actions">
          <Link to="/create" className="btn-primary hero-btn">
            Build My Resume <span>→</span>
          </Link>
          <Link to="#templates" className="btn-secondary hero-btn">
            View Templates
          </Link>
        </div>
        
        <div className="hero-features">
          <span>✓ No design skills needed</span>
          <span>✓ Free to start</span>
          <span>✓ Instant download</span>
        </div>
      </div>
      
      <div className="hero-graphic">
        <div className="browser-mockup">
          <div className="browser-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-body"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
