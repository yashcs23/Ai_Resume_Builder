const express = require('express');
const { body } = require('express-validator');

const resumeController = require('../controllers/resumeController');
const validateRequest = require('../middlewares/validateRequest');
const { protect } = require('../middlewares/auth');

const router = express.Router();

const resumeValidations = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('education').isArray().withMessage('Education must be an array'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('experience').isArray().withMessage('Experience must be an array'),
  body('projects').isArray().withMessage('Projects must be an array')
];

// All resume routes require authentication
router.use(protect);

router
  .route('/')
  .get(resumeController.getResumes)
  .post(resumeValidations, validateRequest, resumeController.createResume);

router
  .route('/:id')
  .get(resumeController.getResume)
  .put(resumeValidations, validateRequest, resumeController.updateResume)
  .delete(resumeController.deleteResume);

module.exports = router;
