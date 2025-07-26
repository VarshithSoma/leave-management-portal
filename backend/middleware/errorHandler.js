// middleware/errorHandler.js

/**
 * Global error handler middleware.
 * Catches errors and sends a formatted JSON response.
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set a default status code if one isn't already set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    message: err.message,
    // Show the stack trace only in development mode for security
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
