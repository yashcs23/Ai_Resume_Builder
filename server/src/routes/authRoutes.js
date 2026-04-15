const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').notEmpty().withMessage('Please confirm your password')
  ],
  validateRequest,
  authController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  authController.login
);

// Protected routes
router.get('/me', protect, authController.getMe);

router.put(
  '/profile',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email')
  ],
  validateRequest,
  authController.updateProfile
);

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    body('confirmPassword').notEmpty().withMessage('Please confirm your new password')
  ],
  validateRequest,
  authController.changePassword
);

router.post('/logout', protect, authController.logout);

module.exports = router;
