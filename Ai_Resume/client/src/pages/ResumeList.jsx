import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useResume } from '../hooks/useResume';
import '../styles/ResumeList.css';

function ResumeList() {
  const { getAllResumes, deleteResume } = useResume();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    setLoading(true);
    try {
      const data = await getAllResumes();
      setResumes(data || []);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id);
        setResumes(resumes.filter(r => r._id !== id));
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading your resumes...</div>;
  }

  return (
    <div className="resume-list-container">
      <h2>My Resumes</h2>
      
      {resumes.length === 0 ? (
        <div className="empty-state">
          <p>No resumes yet. Create one to get started!</p>
          <Link to="/create" className="btn-create">Create First Resume</Link>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map((resume) => (
            <div key={resume._id} className="resume-card">
              <div className="resume-card-header">
                <h3>{resume.name}</h3>
                <p className="resume-date">
                  Created: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="resume-card-info">
                <p><strong>Email:</strong> {resume.email}</p>
                <p><strong>Phone:</strong> {resume.phone}</p>
                {resume.professionalSummary && (
                  <p><strong>Summary:</strong> {resume.professionalSummary.substring(0, 100)}...</p>
                )}
              </div>

              <div className="resume-card-actions">
                <Link to={`/builder/${resume._id}`} className="btn-view">
                  <FaEye /> View
                </Link>
                <Link to={`/edit/${resume._id}`} className="btn-edit">
                  <FaEdit /> Edit
                </Link>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(resume._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeList;
