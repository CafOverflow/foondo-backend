const jwt = require('jsonwebtoken');

function validUser(email, password) {
  return true;
}

function generateAccessToken(email) {
  // expires after half an hour (1800 seconds = 30 minutes)
  const token = jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
}

function authenticate(email, password) {
  // getUser
  if (validUser(email, password)) {
    generateAccessToken(email);
  }
}

module.exports = {
  authenticate,
};
