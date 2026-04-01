import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaPrint, FaEdit } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import { useResume } from '../hooks/useResume';
import '../styles/ResumeBuilder.css';

function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getResume } = useResume();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResume();
  }, [id]);

  const loadResume = async () => {
    try {
      const data = await getResume(id);
      setResume(data);
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById('resume-content');
    if (!element) {
      alert('Resume content not found');
      return;
    }

    const opt = {
      margin: 10,
      filename: `${resume?.name || 'resume'}-resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save().catch(err => {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF. Please try again.');
    });
  };

  if (loading) {
    return <div className="loading">Loading resume...</div>;
  }

  if (!resume) {
    return <div className="error">Resume not found</div>;
  }

  const opt = resume.optimizedResume || {};

  return (
    <div className="resume-builder-container">
      <div className="builder-toolbar">
        <div className="toolbar-left">
          <button onClick={() => navigate('/')} className="btn-back">← Back</button>
          <h2>{resume.name} - AI Generated Resume</h2>
        </div>
        <div className="toolbar-right">
          <button onClick={() => navigate(`/edit/${id}`)} className="btn-action">
            <FaEdit /> Edit
          </button>
          <button onClick={handlePrint} className="btn-action">
            <FaPrint /> Print
          </button>
          <button onClick={handleDownload} className="btn-action">
            <FaDownload /> Download
          </button>
        </div>
      </div>

      <div id="resume-content" className="resume-preview">
        {/* Header */}
        <div className="resume-header">
          <h1>{resume.name}</h1>
          <div className="contact-info">
            {resume.email && <span>{resume.email}</span>}
            {resume.phone && <span>{resume.phone}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {resume.professionalSummary && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            <p>{resume.professionalSummary}</p>
          </section>
        )}

        {/* AI-Generated Optimized Resume */}
        {opt.summary && (
          <section className="resume-section">
            <h2>AI Optimized Summary</h2>
            <p>{opt.summary}</p>
          </section>
        )}

        {/* Skills */}
        {(opt.skills?.length > 0 || resume.skills?.length > 0) && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-display">
              {opt.skills?.map((skill, i) => (
                <span key={i} className="skill-badge">{skill}</span>
              ))}
              {!opt.skills?.length && resume.skills?.map((skill, i) => (
                <span key={i} className="skill-badge">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {(opt.experience?.length > 0 || resume.experience?.length > 0) && (
          <section className="resume-section">
            <h2>Experience</h2>
            {opt.experience?.map((exp, i) => (
              <div key={i} className="experience-item">
                <p className="bullet">• {exp}</p>
              </div>
            ))}
            {!opt.experience?.length && resume.experience?.map((exp, i) => (
              <div key={i} className="experience-item">
                <h3>{exp.position} at {exp.company}</h3>
                <p className="duration">{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {(opt.projects?.length > 0 || resume.projects?.length > 0) && (
          <section className="resume-section">
            <h2>Projects</h2>
            {opt.projects?.map((proj, i) => (
              <div key={i} className="project-item">
                <p className="bullet">• {proj}</p>
              </div>
            ))}
            {!opt.projects?.length && resume.projects?.map((proj, i) => (
              <div key={i} className="project-item">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                {proj.technologies && <p className="tech"><strong>Tech:</strong> {proj.technologies}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resume.education.map((edu, i) => (
              edu.school && (
                <div key={i} className="education-item">
                  <h3>{edu.degree} in {edu.field}</h3>
                  <p className="school">{edu.school}</p>
                  {edu.year && <p className="year">{edu.year}</p>}
                </div>
              )
            ))}
          </section>
        )}

        {/* Experience Highlights */}
        {resume.experienceHighlights?.length > 0 && (
          <section className="resume-section">
            <h2>Highlights</h2>
            <ul>
              {resume.experienceHighlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilder;
