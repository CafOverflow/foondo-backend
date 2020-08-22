const jwt = require('jsonwebtoken');
const userService = require('./userService');

function validateCredentials(userData, password) {
  if (!userData) {
    const error = new Error('User not found!');
    error.statusCode = 400;
    throw error;
  }
  if (userData.password !== password) {
    const error = new Error('Wrong password!');
    error.statusCode = 400;
    throw error;
  }
}

function generateAccessToken(email) {
  // expires after half an hour (1800 seconds = 30 minutes)
  const token = jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
}

function authenticate(email, password) {
  // userService.getUser(email, (userData) => validateCredentials(userData, password));

  userService.getUser(email)
    .then(userData => validateCredentials(userData, password))
    .catch(err => { throw err; });

  // const userData = userService.getUser(email, data => data);
  // validateCredentials(userData, password);

  // generateAccessToken(email);
}

module.exports = {
  authenticate,
};
