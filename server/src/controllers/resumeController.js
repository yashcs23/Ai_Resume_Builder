const asyncHandler = require('../utils/asyncHandler');
const resumeService = require('../services/resumeService');

const createResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.createResume(req.body);
  res.status(201).json({
    status: 'success',
    data: resume
  });
});

const getResumes = asyncHandler(async (_req, res) => {
  const resumes = await resumeService.getAllResumes();
  res.json({
    status: 'success',
    data: resumes
  });
});

const getResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id);
  res.json({
    status: 'success',
    data: resume
  });
});

const updateResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.updateResume(req.params.id, req.body);
  res.json({
    status: 'success',
    data: resume
  });
});

const deleteResume = asyncHandler(async (req, res) => {
  await resumeService.deleteResume(req.params.id);
  res.status(204).send();
});

module.exports = {
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume
};
