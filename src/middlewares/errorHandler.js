require('dotenv').config();

// eslint-disable-next-line no-unused-vars
function handle(err, req, res, next) {
  const env = process.env.NODE_ENV || 'development';
  const statusCode = err.statusCode || 500;
  let errorMessage = err.message;
  if (statusCode >= 500) {
    console.error(err);
    if (env !== 'development') {
      errorMessage = 'Unexpected error.';
    }
  }

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage,
  });
}

module.exports = {
  handle,
};
