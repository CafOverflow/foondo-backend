/* eslint-disable no-console */
const FaunaConnection = require('faunadb-connector');
const array = require('lodash/array');

require('dotenv').config();

const fauna = new FaunaConnection({ secret: process.env.FAUNADB_SERVER_SECRET });

function logAndReturn(thing) {
  // console.log(thing);
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

function deleteUserByRef(ref) {
  console.log(`deleting document for ref ${ref}`);
  return fauna
    .delete('users', ref);
}

function updateDetails(ref, data) {
  return fauna
    .update('users', ref, data)
    .then(res => logAndReturn(res));
}

function addFridgeToUser(userRef, fridgeRef) {
  getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.fridges))
    .then(fridges => ({ fridges: [fridgeRef, ...fridges] }))
    .then(data => updateDetails(userRef, data));
}

function addFavRecipe(userRef, recipe) {
  getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes))
    .then(recipes => ({ recipes: [recipe, ...recipes] }))
    .then(data => updateDetails(userRef, data));
}

function removeFavRecipe(userRef, recipe) {
  getDataFromRef(userRef)
    .then(res => logAndReturn(res.data.recipes))
    .then(recipes => ({ recipes: array.remove(recipes, item => item.id === recipe.id) }))
    .then(data => updateDetails(userRef, data));
}

module.exports = {
  createUser,
  getDataFromRef,
  getDataFromName,
  getRefFromName,
  getDataFromEmail,
  deleteUserByRef,
  updateDetails,
  addFridgeToUser,
  addFavRecipe,
  removeFavRecipe,
};
