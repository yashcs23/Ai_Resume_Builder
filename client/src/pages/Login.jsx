import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-blob login-blob-1"></div>
        <div className="login-blob login-blob-2"></div>
        <div className="login-blob login-blob-3"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon-circle">
              <FaLock className="login-lock-icon" />
            </div>
            <h1>Welcome Back</h1>
            <p className="login-subtitle">Sign in to your AI Resume Builder account</p>
          </div>

          {error && (
            <div className="login-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-wrapper">
                <FaEnvelope className="login-input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <FaLock className="login-input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="login-input"
                />
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <FaArrowRight className="login-button-icon" />
            </button>
          </form>

          <div className="login-divider">
            <span>New to AI Resume Builder?</span>
          </div>

          <Link to="/signup" className="login-signup-link">
            Create an account
          </Link>

          <div className="login-features">
            <div className="login-feature">
              <span className="login-feature-icon">🚀</span>
              <p>Build Amazing Resumes</p>
            </div>
            <div className="login-feature">
              <span className="login-feature-icon">✨</span>
              <p>AI-Powered Content</p>
            </div>
            <div className="login-feature">
              <span className="login-feature-icon">📱</span>
              <p>Download as PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
