const userService = require('../service/userService');

function createUser(req, res) {
  const { data } = req.body;
  if (!data.email) {
    throw new Error('User creation failed - no e-mail provided');
  }
  if (!data.password) {
    throw new Error('User creation failed - no password provided');
  }
  userService.createUser(data)
    .then(() => res.status(201).send())
    .catch(err => { throw err; });
}

function getUser(req, res) {
  const { email } = req.body;
  userService.getUser(email, user => res.status(200).json(user))
    .catch(err => { throw err; });
}

function deleteUser(req, res) {
  const { email } = req.body;
  console.log(email);
  res.status(200).json('to be implemented');
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
};
