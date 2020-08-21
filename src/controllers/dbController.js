const userDb = require('../db/userDb');
const fridgeDb = require('../db/fridgeDb');

function createUser(data) {
  // potential input sanitization here
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
  const { username, password, email } = data;
  const user = {
    user: username,
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

function deleteUser(userRef) {
  userDb.deleteUserByRef(userRef)
    .then(doc => doc.data.fridges.forEach(fridgeRef => fridgeDb.deleteFridgeByRef(fridgeRef)));
}

function addFavRecipe(userRef, recipe) {
  if ('id' in recipe) {
    userDb.addFavRecipe(userRef, recipe);
  } else {
    throw new Error('Invalid recipe structure - must have ID');
  }
}

function removeFavRecipe(userRef, recipe) {
  try {
    userDb.removeFavRecipe(userRef, recipe);
  } catch (e) {
    throw new Error('failed to remove favourite recipe - check that it is actually bookmarked');
  }
}

// const quinn = {
//   user: 'Quinn',
//   email: 'quinn@gmail.com',
//   password: 'secret',
// };

// const masha = {
//   user: 'Masha',
//   email: 'masha@gmail.com',
//   password: 'secret',
// };

// const nishi = {
//   user: 'Nishi',
//   email: 'nishi@gmail.com',
//   password: 'secret',
// };

// createUser(quinn);
// createUser(masha);
// createUser(nishi);

module.exports = {
  createUser,
  addFridgeToUser,
  deleteUser,
  addFavRecipe,
  removeFavRecipe,
};
