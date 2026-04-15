import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('AuthProvider initialized, token:', !!token);
  }, []);

  // Set up axios interceptor with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          try {
            const response = await axios.get(`${API_URL}/auth/me`);
            setUser(response.data.user);
            console.log('Token verified, user:', response.data.user);
          } catch (err) {
            console.log('Token verification failed:', err.message);
            // Token is invalid
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error in verifyToken:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const signup = async (name, email, password, confirmPassword) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        confirmPassword
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      setError(message);
      throw new Error(message);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        signup,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
