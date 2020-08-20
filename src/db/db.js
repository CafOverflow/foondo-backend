/* eslint-disable no-unused-vars */
/* eslint-disable quote-props */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
const userDb = require('./userDb');
const fridgeDb = require('./fridgeDb');

function createUser(data) {
  // potential input sanitization here

  const { username, password, email } = data;
  const user = {
    user: username,
    password,
    email,
    fridges: [],
  };
  userDb.createUser(user)
    .then(data => console.log(data));
}

function addFridgeToUser(ownerRef, name) {
  // potential input sanitization here

  const fridge = {
    ownerRef,
    name,
    ingredients: [],
  };
  fridgeDb.createFridge(fridge)
    .then(fridgeRef => userDb.addFridgeToUser(ownerRef, fridgeRef));
}

const quinn = {
  "user": "Quinn",
  "email": "quinn@gmail.com",
  "password": "secret",
  "fridges": [
  ],
};

function deleteUser(userRef) {
  userDb.deleteUserByRef(userRef)
    .then(doc => doc.data.fridges.forEach(fridgeRef => fridgeDb.deleteFridgeByRef(fridgeRef)));
}

// userDb.createUser(quinn);
// addFridgeToUser('274374089478504967', 'home');
// addFridgeToUser('274374089478504967', 'work');
// deleteUser('274374089478504967');

module.exports = {
  createUser,
  addFridgeToUser,
  deleteUser,
};
