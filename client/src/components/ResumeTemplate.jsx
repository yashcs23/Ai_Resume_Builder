import React from 'react';
import { getTemplateStyle } from '../utils/templates';
import '../styles/ResumeTemplate.css';

function ResumeTemplate({ resume, template = 'modern', theme = 'blue' }) {
  const styles = getTemplateStyle(template, theme);

  if (!resume) {
    return <div>Loading...</div>;
  }

  const opt = resume.optimizedResume || {};

  const containerStyle = {
    ...styles.container,
    padding: '40px',
    maxWidth: '900px',
    margin: '0 auto'
  };

  const headerStyle = styles.header;
  const sectionStyle = styles.section;
  const sectionTitleStyle = styles.sectionTitle;

  return (
    <div style={containerStyle} className={`resume-template resume-${template}`}>
      {/* Header */}
      <div style={headerStyle} className="template-header">
        <h1 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: 'bold' }}>
          {resume.name}
        </h1>
        <div className="template-contact" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '14px' }}>
          {resume.email && <span>📧 {resume.email}</span>}
          {resume.phone && <span>📞 {resume.phone}</span>}
        </div>
      </div>

      {/* AI-Generated Career Highlight */}
      {resume.careerHighlight && (
        <div style={{ 
          ...sectionStyle,
          background: styles.sectionTitle?.color,
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          fontStyle: 'italic',
          marginBottom: '20px'
        }}>
          <p style={{ margin: '0', lineHeight: '1.5', fontSize: '14px', fontWeight: '500' }}>
            {resume.careerHighlight}
          </p>
        </div>
      )}

      {/* Professional Summary - AI Generated */}
      {(resume.professionalSummary || opt.summary) && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Professional Summary</h2>
          <p style={{ lineHeight: '1.6', margin: '0', fontSize: '14px' }}>
            {resume.professionalSummary || opt.summary}
          </p>
        </section>
      )}

      {/* Skills - AI Enhanced */}
      {(opt.skills?.length > 0 || resume.skills?.length > 0) && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Skills</h2>
          <div className="template-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(opt.skills || resume.skills)?.map((skill, i) => (
              <span
                key={i}
                className="template-skill-badge"
                style={{
                  background: getTemplateStyle(template, theme).sectionTitle.color,
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience - AI Generated Descriptions */}
      {(opt.experience?.length > 0 || resume.experience?.length > 0) && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Work Experience</h2>
          <div className="template-experience">
            {opt.experience?.length > 0 ? (
              opt.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '18px', lineHeight: '1.7' }}>
                  <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: styles.sectionTitle?.color }}>
                    • {exp}
                  </p>
                </div>
              ))
            ) : (
              resume.experience?.map((exp, i) =>
                exp.company && (
                  <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h3 style={{ margin: '0', fontSize: '15px', fontWeight: '600' }}>
                        {exp.position}
                      </h3>
                      <span style={{ fontSize: '13px', color: '#666' }}>{exp.duration}</span>
                    </div>
                    <p style={{ margin: '3px 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#555' }}>
                      {exp.company}
                    </p>
                    <p style={{ margin: '0', fontSize: '13px', lineHeight: '1.6', color: '#444' }}>
                      {exp.description}
                    </p>
                  </div>
                )
              )
            )}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Education</h2>
          <div className="template-education">
            {resume.education.map((edu, i) =>
              edu.school && (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>
                      {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                    </h3>
                    {edu.year && <span style={{ fontSize: '13px', color: '#666' }}>{edu.year}</span>}
                  </div>
                  <p style={{ margin: '0', fontSize: '13px', color: '#555' }}>
                    {edu.school}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Projects - AI Enhanced */}
      {(opt.projects?.length > 0 || resume.projects?.length > 0) && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Projects</h2>
          <div className="template-projects">
            {opt.projects?.length > 0 ? (
              opt.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '15px', fontSize: '13px', lineHeight: '1.6' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: styles.sectionTitle?.color }}>
                    • {proj}
                  </p>
                </div>
              ))
            ) : (
              resume.projects?.map((proj, i) =>
                proj.title && (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <h3 style={{ margin: '0 0 3px 0', fontSize: '14px', fontWeight: '600' }}>
                      {proj.title}
                    </h3>
                    <p style={{ margin: '0 0 3px 0', fontSize: '13px', lineHeight: '1.5' }}>
                      {proj.description}
                    </p>
                    {proj.technologies && (
                      <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                        <strong>Tech:</strong> {proj.technologies}
                      </p>
                    )}
                  </div>
                )
              )
            )}
          </div>
        </section>
      )}

      {/* Additional Highlights - AI Generated */}
      {opt.additionalHighlights?.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Key Achievements</h2>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
            {opt.additionalHighlights.map((highlight, i) => (
              <li key={i} style={{ marginBottom: '8px', fontSize: '13px' }}>
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience Highlights */}
      {resume.experienceHighlights?.length > 0 && !opt.additionalHighlights?.length && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Key Highlights</h2>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
            {resume.experienceHighlights.map((highlight, i) => (
              <li key={i} style={{ marginBottom: '5px', fontSize: '13px' }}>
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications - AI Generated */}
      {opt.certifications?.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Certifications</h2>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
            {opt.certifications.map((cert, i) => (
              <li key={i} style={{ marginBottom: '5px', fontSize: '13px' }}>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ResumeTemplate;
