const userService = require('../service/userService');

function createUser(req, res) {
  const { data } = req.body;
  // input sanitization here
  // sample:
  // data = {
  //   user: 'kappa',
  //   email: 'kappa@gmail.com',
  //   password: 'secret',
  //   diet: {
  //     restrictions: [],
  //     excluded: [],
  //   }
  //   fridges: [],
  //   recipes: [],
  // };

  userService.createUser(data);
  return res.status(201);
}

function getUser(req, res) {
  const { email } = req.body;
  // input sanitization here
  userService.getUser(email, user => res.status(200).json(user));
}

function deleteUser(req, res) {
  const { email } = req.body;
  console.log(email);
  // input sanitization here
  // to be implemented
  res.status(200).json('to be implemented');
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
};
