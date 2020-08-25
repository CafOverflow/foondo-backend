/* eslint-disable no-console */
const FaunaConnection = require('faunadb-connector');

require('dotenv').config();

const fauna = new FaunaConnection({ secret: process.env.FAUNADB_SERVER_SECRET });

function logAndReturn(thing) {
  console.log(thing);
  return thing;
}

function createUser(data) {
  // sample:
  // data = {
  //   name: 'kappa',
  //   email: 'kappa@gmail.com',
  //   password: 'secret',
  //   diet: {
  //     restrictions: [],
  //     excluded: [],
  //   }
  //   fridges: [],
  //   recipes: [],
  // };
  console.log(`creating user with name ${data.name}`);
  return fauna
    .create('users', data)
    .then(res => logAndReturn(res[0].ref.id))
    .catch(err => console.log(err));
}

function getDataFromRef(ref) {
  console.log(`retreiving data for user ref ${ref}`);
  return fauna
    .get('users', ref)
    .then(res => logAndReturn(res))
    .catch(err => console.log(err));
}

function getRefFromName(name) {
  console.log(`retreiving id for user name ${name}`);
  return fauna
    .getMatch('userByName', name)
    .then(res => logAndReturn(res.ref.id));
}

function getDataFromName(name) {
  console.log(`retreiving data for user name ${name}`);
  return fauna
    .getMatch('userByName', name)
    .then(res => logAndReturn(res.data))
    .catch(err => console.log(err));
}

function getDataFromEmail(email) {
  console.log(`retreiving data for user email ${email}`);
  return fauna
    .getMatch('userByEmail', email)
    .then(res => logAndReturn(res.data))
    .catch(err => console.log(err));
}

function getFromEmail(email) {
  console.log(`retreiving all for user email ${email}`);
  return fauna
    .getMatch('userByEmail', email)
    .then(res => logAndReturn(res))
    .catch(err => console.log(err));
}

function deleteUserByRef(ref) {
  console.log(`deleting document for ref ${ref}`);
  return fauna
    .delete('users', ref);
}

function updateDetails(ref, data) {
  console.log(`updating details for user with ref ${ref}`);
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
  console.log(`adding fav recipe to user with ref ${userRef}`);
  return getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes))
    .then(recipes => {
      console.log(recipes);
      if (recipes.findIndex(item => recipe.id === item.id) !== -1) {
        return { succeeded: false, recipes };
      }
      return { succeeded: true, recipes: [recipe, ...recipes] };
    })
    .then(data => (data.succeeded
      ? updateDetails(userRef, data)
      : data.recipes))
    .catch(err => { throw err; });
}

function removeFavRecipe(userRef, id) {
  console.log(`removing fav recipe from user with ref ${userRef}`);
  getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes))
    .then(recipes => ({ recipes: recipes.filter(item => item.id !== id) }))
    .then(data => updateDetails(userRef, data));
}

function getFavRecipes(userRef) {
  console.log(`retrieving fav recipes for user ref ${userRef}`);
  getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes));
}

function getDiet(userRef) {
  console.log(`retrieving dietary information for user ref ${userRef}`);
  getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.diet));
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
};
