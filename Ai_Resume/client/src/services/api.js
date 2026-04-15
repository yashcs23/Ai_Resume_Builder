import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const formatApiError = (error, fallbackMessage) => {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    fallbackMessage;
  return new Error(message);
};
// Resume API endpoints
export const resumeService = {
  // Create a new resume
  createResume: async (data) => {
    try {
      const response = await api.post('/resumes', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw formatApiError(error, 'Error creating resume');
    }
  },

  // Get all resumes
  getAllResumes: async () => {
    try {
      const response = await api.get('/resumes');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw formatApiError(error, 'Error fetching resumes');
    }
  },

  // Get a single resume by ID
  getResume: async (id) => {
    try {
      const response = await api.get(`/resumes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw formatApiError(error, 'Error fetching resume');
    }
  },

  // Update a resume
  updateResume: async (id, data) => {
    try {
      const response = await api.put(`/resumes/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw formatApiError(error, 'Error updating resume');
    }
  },

  // Delete a resume
  deleteResume: async (id) => {
    try {
      await api.delete(`/resumes/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw formatApiError(error, 'Error deleting resume');
    }
  }
};

export default api;
