const asyncHandler = require('../utils/asyncHandler');
const resumeService = require('../services/resumeService');

const createResume = asyncHandler(async (req, res) => {
  const resumeData = {
    ...req.body,
    userId: req.user._id
  };
  const resume = await resumeService.createResume(resumeData);
  res.status(201).json({
    status: 'success',
    data: resume
  });
});

const getResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getAllResumes(req.user._id);
  res.json({
    status: 'success',
    data: resumes
  });
});

const getResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id, req.user._id);
  res.json({
    status: 'success',
    data: resume
  });
});

const updateResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.updateResume(req.params.id, req.body, req.user._id);
  res.json({
    status: 'success',
    data: resume
  });
});

const deleteResume = asyncHandler(async (req, res) => {
  await resumeService.deleteResume(req.params.id, req.user._id);
  res.status(204).send();
});

module.exports = {
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume
};
