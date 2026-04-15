import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password, confirmPassword);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="signup-blob signup-blob-1"></div>
        <div className="signup-blob signup-blob-2"></div>
        <div className="signup-blob signup-blob-3"></div>
      </div>

      <div className="signup-content">
        <div className="signup-card">
          <div className="signup-header">
            <div className="signup-icon-circle">
              <FaCheckCircle className="signup-check-icon" />
            </div>
            <h1>Join Us Today</h1>
            <p className="signup-subtitle">Create your account and start building amazing resumes</p>
          </div>

          {error && (
            <div className="signup-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-input-group">
              <label htmlFor="name">Full Name</label>
              <div className="signup-input-wrapper">
                <FaUser className="signup-input-icon" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className="signup-input"
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="signup-input-wrapper">
                <FaEnvelope className="signup-input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="signup-input"
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label htmlFor="password">Password</label>
              <div className="signup-input-wrapper">
                <FaLock className="signup-input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  disabled={loading}
                  className="signup-input"
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="signup-input-wrapper">
                <FaLock className="signup-input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  className="signup-input"
                />
              </div>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              <span>{loading ? 'Creating account...' : 'Create Account'}</span>
              <FaCheckCircle className="signup-button-icon" />
            </button>
          </form>

          <div className="signup-divider">
            <span>Already have an account?</span>
          </div>

          <Link to="/login" className="signup-login-link">
            Sign in here
          </Link>

          <div className="signup-benefits">
            <div className="signup-benefit">
              <span className="signup-benefit-icon">💼</span>
              <p>Professional Templates</p>
            </div>
            <div className="signup-benefit">
              <span className="signup-benefit-icon">🤖</span>
              <p>AI-Powered Suggestions</p>
            </div>
            <div className="signup-benefit">
              <span className="signup-benefit-icon">⚡</span>
              <p>Instant Generation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
