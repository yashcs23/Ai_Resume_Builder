const ApiError = require('../utils/ApiError');

const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    status: 'error',
    message,
    details: err.details || undefined
  });
};

module.exports = errorHandler;
