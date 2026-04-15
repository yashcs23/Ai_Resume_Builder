const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    throw new ApiError(400, 'Please provide all required fields');
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match');
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create user
  user = await User.create({
    name,
    email,
    password
  });

  // Generate token
  const token = user.getJWT();

  res.status(201).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }

  // Check for user (select password explicitly since it's hidden by default)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Check password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Generate token
  const token = user.getJWT();

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    user
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, 'Please provide all password fields');
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, 'New passwords do not match');
  }

  const user = await User.findById(req.user.id).select('+password');

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  const token = user.getJWT();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully',
    token
  });
});

// @desc    Logout user (frontend handles this by removing token)
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});
