const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Helper for generating JWT exactly like authController
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_123', {
    expiresIn: '30d',
  });
};

// --- Standard Auth ---
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- Google OAuth ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const user = JSON.stringify({
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email
    });
    // Redirect to frontend with token in query param
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/callback?token=${token}&user=${encodeURIComponent(user)}`);
  }
);

// --- LinkedIn OAuth ---
router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME_STATE', session: false }));

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const user = JSON.stringify({
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email
    });
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/callback?token=${token}&user=${encodeURIComponent(user)}`);
  }
);

module.exports = router;
