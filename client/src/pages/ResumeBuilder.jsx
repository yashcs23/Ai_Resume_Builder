import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaPrint, FaEdit } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import { useResume } from '../hooks/useResume';
import ResumeTemplate from '../components/ResumeTemplate';
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
        <ResumeTemplate
          resume={resume}
          template={resume.template || 'modern'}
          theme={resume.templateTheme || 'blue'}
        />
      </div>
    </div>
  );
}

export default ResumeBuilder;
