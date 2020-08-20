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
  //   user: 'kappa',
  //   email: 'kappa@gmail.com',
  //   password: 'secret',
  //   fridges: [],
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
    .then(res => logAndReturn(res.data));
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

module.exports = {
  createUser,
  getDataFromRef,
  getDataFromName,
  getRefFromName,
  deleteUserByRef,
  updateDetails,
  addFridgeToUser,
};
