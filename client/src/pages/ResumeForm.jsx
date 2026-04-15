import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import TemplateSelector from '../components/TemplateSelector';
import '../styles/ResumeForm.css';

function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createResume, updateResume, getResume, loading } = useResume();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    education: [{ school: '', degree: '', field: '', year: '' }],
    skills: [],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    projects: [{ title: '', description: '', technologies: '' }],
    template: 'modern',
    templateTheme: 'blue'
  });

  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (id) {
      loadResume();
    }
  }, [id]);

  const loadResume = async () => {
    const resume = await getResume(id);
    if (resume) {
      setFormData(resume);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, education: updated }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: updated }));
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, projects: updated }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', field: '', year: '' }]
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', technologies: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = id 
        ? await updateResume(id, formData)
        : await createResume(formData);
      
      if (result) {
        navigate(`/builder/${result._id}`);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <div className="resume-form-container">
      <h2>{id ? 'Edit Resume' : 'Create Resume'}</h2>
      
      <TemplateSelector 
        selectedTemplate={formData.template}
        selectedTheme={formData.templateTheme}
        onTemplateChange={(template) => setFormData(prev => ({ ...prev, template }))}
        onThemeChange={(theme) => setFormData(prev => ({ ...prev, templateTheme: theme }))}
      />
      
      <form onSubmit={handleSubmit} className="resume-form">
        {/* Personal Info */}
        <section className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows="3"
          />
        </section>

        {/* Skills */}
        <section className="form-section">
          <h3>Skills</h3>
          <div className="skills-input">
            <input
              type="text"
              placeholder="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button type="button" onClick={addSkill}>Add Skill</button>
          </div>
          <div className="skills-list">
            {formData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
                <button type="button" onClick={() => removeSkill(index)}>×</button>
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
              />
              <input
                type="text"
                placeholder="Graduation Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={addEducation} className="btn-add">+ Add Education</button>
        </section>

        {/* Experience */}
        <section className="form-section">
          <h3>Work Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
              />
              <textarea
                placeholder="Job Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                rows="3"
              />
            </div>
          ))}
          <button type="button" onClick={addExperience} className="btn-add">+ Add Experience</button>
        </section>

        {/* Projects */}
        <section className="form-section">
          <h3>Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              />
              <textarea
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                rows="2"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={proj.technologies}
                onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={addProject} className="btn-add">+ Add Project</button>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Processing...' : 'Generate AI Resume'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;
