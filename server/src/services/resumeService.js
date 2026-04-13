const Resume = require('../models/Resume');
const ApiError = require('../utils/ApiError');
const { generateResumeContent } = require('./aiService');

const createResume = async (payload) => {
  const aiResult = await generateResumeContent(payload);
  const resume = await Resume.create({
    ...payload,
    ...aiResult
  });
  return resume;
};

const getAllResumes = async () => Resume.find().sort({ createdAt: -1 });

const getResumeById = async (id) => {
  const resume = await Resume.findById(id);
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }
  return resume;
};

const updateResume = async (id, payload) => {
  const aiResult = await generateResumeContent(payload);

  const resume = await Resume.findByIdAndUpdate(
    id,
    {
      ...payload,
      ...aiResult
    },
    { new: true, runValidators: true }
  );

  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  return resume;
};

const deleteResume = async (id) => {
  const deleted = await Resume.findByIdAndDelete(id);
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
