const jwt = require('jsonwebtoken');
const userService = require('./userService');
require('dotenv').config();

function validateCredentials(user, password) {
  if (!user) {
    const error = new Error('User not found!');
    error.statusCode = 400;
    return { error };
  }
  if (user.data.password !== password) {
    const error = new Error('Wrong password!');
    error.statusCode = 400;
    return { error };
  }
  return { user, error: null };
}

function generateAccessToken(id) {
  // expires after half an hour (1800 seconds = 30 minutes)
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30 days' });
  return token;
}

async function authenticate(email, password) {
  const validationResult = await userService
    .getUserAll(email, user => validateCredentials(user, password));

  if (validationResult.error) {
    throw (validationResult.error);
  }

  console.log(validationResult.user);
  const { id } = validationResult.user.ref;
  return generateAccessToken(id);
}

module.exports = {
  authenticate,
};
