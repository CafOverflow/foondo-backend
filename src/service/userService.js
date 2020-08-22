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
  userDb.createUser(user)
    .then(response => console.log(response));
}

function getUser(email) {
  return userDb.getDataFromEmail(email);
  // .then(res => cb(res));
}

function deleteUser(userRef) {
  userDb.deleteUserByRef(userRef);
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
  deleteUser,
};
