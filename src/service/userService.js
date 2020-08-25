const userDb = require('../db/userDb');

function createUser(data) {
  const { name, password, email } = data;
  const user = {
    name,
    password,
    email,
    diet: {
      restrictions: [],
      excluded: [],
    },
    fridges: [],
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
  // .then(doc => doc.data.fridges.forEach(fridgeRef => fridgeDb.deleteFridgeByRef(fridgeRef)));
}

// const quinn = {
//   name: 'Quinn',
//   email: 'quinn@gmail.com',
//   password: 'secret',
// };

// const masha = {
//   name: 'Masha',
//   email: 'masha@gmail.com',
//   password: 'secret',
// };

// const nishi = {
//   name: 'Nishi',
//   email: 'nishi@gmail.com',
//   password: 'secret',
// };

// createUser(quinn);
// createUser(masha);
// createUser(nishi);

module.exports = {
  createUser,
  getUser,
  getUserAll,
  deleteUser,
};
