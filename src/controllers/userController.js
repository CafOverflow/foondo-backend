const userService = require('../service/userService');

function createUser(req, res, next) {
  const { data } = req.body;
  if (!data.email) {
    next(new Error('User creation failed - no e-mail provided'));
  }
  if (!data.password) {
    next(new Error('User creation failed - no password provided'));
  }
  userService.createUser(data)
    .then(() => res.status(201).send())
    .catch(err => { next(err); });
}

function getUser(req, res, next) {
  const { email } = req.body;
  userService.getUser(email, user => res.status(200).json(user))
    .catch(err => { next(err); });
}

module.exports = {
  createUser,
  getUser,
};
