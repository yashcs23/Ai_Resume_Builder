import React, { useState } from 'react';
import { RESUME_TEMPLATES, THEME_COLORS, getTemplateStyle } from '../utils/templates';
import ResumeTemplate from './ResumeTemplate';
import '../styles/TemplateSelector.css';

// Sample resume data for preview
const SAMPLE_RESUME = {
  name: 'John Anderson',
  email: 'john.anderson@email.com',
  phone: '+1 (555) 123-4567',
  professionalSummary: 'Results-driven professional with 5+ years of experience in software development and project management.',
  skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Project Management', 'Leadership'],
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Developer',
      duration: '2021 - Present',
      description: 'Led development of 3+ major projects and mentored junior developers. Improved system performance by 40%.'
    },
    {
      company: 'Innovation Labs',
      position: 'Full Stack Developer',
      duration: '2019 - 2021',
      description: 'Developed and maintained web applications. Collaborated with cross-functional teams.'
    }
  ],
  education: [
    {
      school: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      year: '2019'
    }
  ],
  projects: [
    {
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with payment integration',
      technologies: 'React, Node.js, MongoDB'
    }
  ]
};

function TemplateSelector({ selectedTemplate, selectedTheme, onTemplateChange, onThemeChange }) {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="template-selector">
      <div className="template-selector-wrapper">
        <div className="template-selector-options">
          <div className="template-section">
            <div className="section-header">
              <h3>Resume Template</h3>
              <span className="preview-toggle" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? '👁️ Hide Preview' : '👁️ Show Preview'}
              </span>
            </div>
            <div className="template-grid">
              {Object.values(RESUME_TEMPLATES).map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.id ? 'active' : ''}`}
                  onClick={() => onTemplateChange(template.id)}
                >
                  <div className="template-icon">{template.thumbnail}</div>
                  <div className="template-name">{template.name}</div>
                  <div className="template-description">{template.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-section">
            <h3>Color Theme</h3>
            <div className="theme-grid">
              {Object.entries(THEME_COLORS).map(([themeName, colors]) => (
                <div
                  key={themeName}
                  className={`theme-card ${selectedTheme === themeName ? 'active' : ''}`}
                  onClick={() => onThemeChange(themeName)}
                >
                  <div className="theme-preview">
                    <div
                      className="theme-color-primary"
                      style={{ background: colors.primary }}
                    ></div>
                    <div
                      className="theme-color-accent"
                      style={{ background: colors.accent }}
                    ></div>
                  </div>
                  <div className="theme-name">{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="template-preview-panel">
            <div className="preview-header">
              <h4>Template Preview</h4>
              <span className="preview-note">Live preview with sample data</span>
            </div>
            <div className="preview-content">
              <ResumeTemplate
                resume={SAMPLE_RESUME}
                template={selectedTemplate}
                theme={selectedTheme}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateSelector;
