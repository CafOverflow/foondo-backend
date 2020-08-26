const userService = require('../service/userService');

function createUser(req, res) {
  const { data } = req.body;
  userService.createUser(data)
    .then(() => res.status(201).send());
}

function getUser(req, res) {
  const { email } = req.body;
  userService.getUser(email, user => res.status(200).json(user));
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
