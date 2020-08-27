const FaunaConnection = require('faunadb-connector');

require('dotenv').config();

const fauna = new FaunaConnection({ secret: process.env.FAUNADB_SERVER_SECRET });

function logAndReturn(thing) {
  console.log(thing);
  return thing;
}

function createUser(data) {
  return fauna
    .create('users', data)
    .then(res => logAndReturn(res[0].ref.id))
    .catch(err => console.log(err));
}

function getDataFromRef(ref) {
  return fauna
    .get('users', ref)
    .then(res => logAndReturn(res))
    .catch(err => console.log(err));
}

function getRefFromName(name) {
  return fauna
    .getMatch('userByName', name)
    .then(res => logAndReturn(res.ref.id));
}

function getDataFromName(name) {
  return fauna
    .getMatch('userByName', name)
    .then(res => logAndReturn(res.data))
    .catch(err => console.log(err));
}

function getDataFromEmail(email) {
  return fauna
    .getMatch('userByEmail', email)
    .then(res => logAndReturn(res.data))
    .catch(err => console.log(err));
}

function getFromEmail(email) {
  return fauna
    .getMatch('userByEmail', email)
    .then(res => logAndReturn(res))
    .catch(err => console.log(err));
}

function deleteUserByRef(ref) {
  return fauna
    .delete('users', ref);
}

function updateDetails(ref, data) {
  return fauna
    .update('users', ref, data)
    .then(res => logAndReturn(res));
}

function addFridgeToUser(userRef, fridgeRef) {
  return getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.fridges))
    .then(fridges => ({ fridges: [fridgeRef, ...fridges] }))
    .then(data => updateDetails(userRef, data));
}

function addFavRecipe(userRef, recipe) {
  return getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes))
    .then(recipes => {
      if (recipes.findIndex(item => recipe.id === item.id) !== -1) {
        return { succeeded: false, recipes: { recipes } };
      }
      return { succeeded: true, recipes: { recipes: [recipe, ...recipes] } };
    })
    .then(data => (data.succeeded
      ? updateDetails(userRef, data.recipes)
      : data.recipes))
    .catch(err => { throw err; });
}

function removeFavRecipe(userRef, id) {
  return getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes))
    .then(recipes => ({
      recipes: recipes.filter(item => {
        return item.id !== id;
      }),
    }))
    .then(data => updateDetails(userRef, data));
}

function getFavRecipes(userRef) {
  getDataFromRef(userRef)
    .then(res => res.data.recipes);
}

function getDiet(userRef) {
  return getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.diet));
}

function getIntolerances(userRef) {
  return getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.intolerances));
}

module.exports = {
  createUser,
  getDataFromRef,
  getDataFromName,
  getRefFromName,
  getDataFromEmail,
  getFromEmail,
  deleteUserByRef,
  updateDetails,
  addFridgeToUser,
  addFavRecipe,
  removeFavRecipe,
  getFavRecipes,
  getDiet,
  getIntolerances,
};
