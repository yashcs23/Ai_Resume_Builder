import { useState } from 'react';
import { resumeService } from '../services/api';

export const useResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createResume = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.createResume(data);
      return result;
    } catch (err) {
      setError(err.message || 'Error creating resume');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.getAllResumes();
      return result;
    } catch (err) {
      setError(err.message || 'Error fetching resumes');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getResume = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.getResume(id);
      return result;
    } catch (err) {
      setError(err.message || 'Error fetching resume');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.updateResume(id, data);
      return result;
    } catch (err) {
      setError(err.message || 'Error updating resume');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.deleteResume(id);
      return result;
    } catch (err) {
      setError(err.message || 'Error deleting resume');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createResume,
    getAllResumes,
    getResume,
    updateResume,
    deleteResume
  };
};
