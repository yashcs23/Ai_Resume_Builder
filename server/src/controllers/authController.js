const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_123', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'Email address is already in use.' });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
    });

    if (user) {
      // Send Welcome Email
      sendWelcomeEmail(user.email, user.fullName);

      res.status(201).json({
        status: 'success',
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid user data received.' });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user (include password field which is selected false by default)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials.' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials.' });
    }

    res.json({
      status: 'success',
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};
