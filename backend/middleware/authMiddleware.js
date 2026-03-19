const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ─── protect ────────────────────────────────────────────────────────────────
// Verifies the JWT sent in the Authorization header.
// On success → attaches the user document to req.user and calls next().
// On failure → returns 401 immediately.

const protect = async (req, res, next) => {
  let token;

  // JWT is expected as:  Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1]; // extract token part
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorised, no token' });
  }

  try {
    // Decode and verify the token using the same secret used to sign it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from DB — excluding the hashed password
    // This ensures req.user always reflects the current DB state
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorised, user not found' });
    }

    next(); // user is valid — continue to the route handler
  } catch (error) {
    // Catches expired tokens, tampered tokens, etc.
    return res.status(401).json({ message: 'Not authorised, token failed' });
  }
};

// ─── adminOnly ───────────────────────────────────────────────────────────────
// Must run AFTER protect (depends on req.user being set).
// Allows access only if the user's role is 'admin'.

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorised, admin access only' });
  }
};

module.exports = { protect, adminOnly };