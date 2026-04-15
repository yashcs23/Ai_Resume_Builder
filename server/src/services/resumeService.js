const Resume = require('../models/Resume');
const ApiError = require('../utils/ApiError');
const { generateResumeContent } = require('./aiService');

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

const normalizeEducation = (education = []) =>
  normalizeArray(education).map((item) => ({
    school: item.school || item.institution || '',
    degree: item.degree || '',
    field: item.field || item.description || '',
    year: item.year || item.endDate || item.graduationYear || ''
  }));

const normalizeExperience = (experience = []) =>
  normalizeArray(experience).map((item) => ({
    company: item.company || '',
    position: item.position || item.role || '',
    duration:
      item.duration ||
      [item.startDate, item.endDate].filter(Boolean).join(' - ') ||
      '',
    description: item.description || ''
  }));

const normalizeProjects = (projects = []) =>
  normalizeArray(projects).map((item) => ({
    title: item.title || item.name || '',
    description: item.description || '',
    technologies:
      typeof item.technologies === 'string'
        ? item.technologies
        : normalizeArray(item.technologies).join(', ')
  }));

const normalizeSkills = (skills = []) => {
  if (typeof skills === 'string') {
    return skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return normalizeArray(skills).map((skill) => String(skill).trim()).filter(Boolean);
};

const normalizeResumePayload = (payload = {}) => ({
  userId: payload.userId,
  name: payload.name || '',
  email: payload.email || '',
  phone: payload.phone || '',
  summary: payload.summary || '',
  education: normalizeEducation(payload.education),
  skills: normalizeSkills(payload.skills),
  experience: normalizeExperience(payload.experience),
  projects: normalizeProjects(payload.projects),
  template: payload.template,
  templateTheme: payload.templateTheme
});

const createResume = async (payload) => {
  const normalizedPayload = normalizeResumePayload(payload);
  const aiResult = await generateResumeContent(normalizedPayload);

  const resume = await Resume.create({
    ...normalizedPayload,
    professionalSummary: aiResult.professionalSummary,
    careerHighlight: aiResult.careerHighlight,
    experienceHighlights: aiResult.experienceHighlights,
    optimizedResume: aiResult.optimizedResume
  });

  return resume;
};

const getAllResumes = async (userId) => Resume.find({ userId }).sort({ createdAt: -1 });

const getResumeById = async (id, userId) => {
  const resume = await Resume.findOne({ _id: id, userId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }
  return resume;
};

const updateResume = async (id, payload, userId) => {
  const existing = await Resume.findOne({ _id: id, userId });
  if (!existing) {
    throw new ApiError(404, 'Resume not found');
  }

  const mergedPayload = normalizeResumePayload({
    ...existing.toObject(),
    ...payload,
    userId
  });
  const aiResult = await generateResumeContent(mergedPayload);

  const updatedResume = await Resume.findOneAndUpdate(
    { _id: id, userId },
    {
      ...mergedPayload,
      professionalSummary: aiResult.professionalSummary,
      careerHighlight: aiResult.careerHighlight,
      experienceHighlights: aiResult.experienceHighlights,
      optimizedResume: aiResult.optimizedResume
    },
    { new: true, runValidators: true }
  );

  return updatedResume;
};

const deleteResume = async (id, userId) => {
  const deleted = await Resume.findOneAndDelete({ _id: id, userId });
  if (!deleted) {
    throw new ApiError(404, 'Resume not found');
  }
  return deleted;
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume
};
