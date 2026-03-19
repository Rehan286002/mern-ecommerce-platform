const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Helper: formats the user object we send back in every response.
// We never send the password — even hashed — to the client.
const formatUser = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  address: user.address,
  token,
});

// ---------------------------------------------------------------
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
// ---------------------------------------------------------------
const registerUser = async (req, res) => {
  // express-validator results from the route-level validation chain
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Prevent duplicate accounts
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user — password is hashed automatically by the pre-save hook
    const user = await User.create({ name, email, password });

    res.status(201).json(formatUser(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @desc    Login user and return JWT
// @route   POST /api/users/login
// @access  Public
// ---------------------------------------------------------------
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // matchPassword is the instance method defined on the User schema
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json(formatUser(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private  (requires protect middleware — added in Step 3)
// ---------------------------------------------------------------
const getUserProfile = async (req, res) => {
  try {
    // req.user is attached by the auth middleware (Step 3)
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private  (requires protect middleware — added in Step 3)
// ---------------------------------------------------------------
const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only update fields that were actually sent in the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone ?? user.phone;
    
    if (req.body.address) {
      user.address = {
        street: req.body.address.street ?? user.address?.street,
        city: req.body.address.city ?? user.address?.city,
        state: req.body.address.state ?? user.address?.state,
        postalCode: req.body.address.postalCode ?? user.address?.postalCode,
        country: req.body.address.country ?? user.address?.country,
      };
    }
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json(formatUser(updatedUser, generateToken(updatedUser._id)));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };