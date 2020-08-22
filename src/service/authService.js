const jwt = require('jsonwebtoken');
const userService = require('./userService');
require('dotenv').config();

function validateCredentials(userData, password) {
  if (!userData) {
    const error = new Error('User not found!');
    error.statusCode = 400;
    return error;
  }
  if (userData.password !== password) {
    const error = new Error('Wrong password!');
    error.statusCode = 400;
    return error;
  }
  return null;
}

function generateAccessToken(email) {
  // expires after half an hour (1800 seconds = 30 minutes)
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30 days' });
  return token;
}

async function authenticate(email, password) {
  const validationError = await userService
    .getUser(email, userData => validateCredentials(userData, password));

  if (validationError) {
    throw (validationError);
  }

  return generateAccessToken(email);
}

module.exports = {
  authenticate,
};
