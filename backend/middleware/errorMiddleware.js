// ─── notFound ────────────────────────────────────────────────────────────────
// Catches any request that didn't match a defined route.
// Creates a proper 404 error and passes it to errorHandler below.

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error); // pass to errorHandler
};

// ─── errorHandler ────────────────────────────────────────────────────────────
// Central error handler — must have 4 parameters for Express to treat it
// as an error-handling middleware (the (err, req, res, next) signature).
//
// All controllers call next(error) or throw — this catches everything.

const errorHandler = (err, req, res, next) => {
  // Sometimes a 200 slips through with an error object — force it to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Show stack trace only in development — never expose it in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };