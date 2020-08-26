const userDb = require('../db/userDb');

function createUser(data) {
  const { password, email } = data;
  const user = {
    password,
    email,
    diet: '',
    intolerances: [],
    ingredients: [],
    recipes: [],
  };
  return userDb.createUser(user)
    .then(response => (response));
}

function getUser(email, cb) {
  return userDb.getDataFromEmail(email)
    .then(res => cb(res));
}

function getUserAll(email, cb) {
  return userDb.getFromEmail(email)
    .then(res => cb(res));
}

function deleteUser(userRef) {
  return userDb.deleteUserByRef(userRef);
}

module.exports = {
  createUser,
  getUser,
  getUserAll,
  deleteUser,
};
