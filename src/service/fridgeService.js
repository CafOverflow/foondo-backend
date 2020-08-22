const fridgeDb = require('../db/fridgeDb');
const userDb = require('../db/userDb');

function addFridgeToUser(ownerRef, name) {
  const fridge = {
    ownerRef,
    name,
    ingredients: [],
  };
  fridgeDb.createFridge(fridge)
    .then(fridgeRef => userDb.addFridgeToUser(ownerRef, fridgeRef));
}

module.exports = {
  addFridgeToUser,
};
