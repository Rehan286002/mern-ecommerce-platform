const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

const router = express.Router();

// NOTE: The `protect` middleware (from Step 3) will be imported and added
// to the profile routes once authMiddleware.js is created.
// For now, the route is defined so we can test the public endpoints.

// --- Validation chains ---
// These arrays are passed as middleware before the controller function.
// express-validator checks each rule and stores errors in the request object.
// The controller reads them with validationResult(req).

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];

// --- Routes ---
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// TODO (Step 3): Add `protect` middleware before getUserProfile & updateUserProfile
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateValidation, updateUserProfile);

module.exports = router;