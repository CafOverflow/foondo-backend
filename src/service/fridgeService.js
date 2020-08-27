const userDb = require('../db/userDb');

function addIngredients(userRef, ingredientsList) {
  return userDb.getDataFromRef(userRef)
    .then(data => [...data.data.ingredients,
      ...ingredientsList.filter(item => item.id
        && !data.data.ingredients.find(fridgeItem => fridgeItem.id === item.id))])
    .then(ingredients => userDb.updateDetails(userRef, { ingredients }));
}

function removeIngredients(userRef, ingredientsIdList) {
  return userDb.getDataFromRef(userRef)
    .then(data => data.data.ingredients.filter(item => !ingredientsIdList.includes(item.id)))
    .then(ingredients => userDb.updateDetails(userRef, { ingredients }));
}

function getFridgeContents(userRef) {
  return userDb.getDataFromRef(userRef)
    .then(data => data.data.ingredients);
}

module.exports = {
  getFridgeContents,
  addIngredients,
  removeIngredients,
};
