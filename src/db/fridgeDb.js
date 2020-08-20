/* eslint-disable no-console */
const FaunaConnection = require('faunadb-connector');

require('dotenv').config();

const fauna = new FaunaConnection({ secret: process.env.FAUNADB_SERVER_SECRET });

function logAndReturn(thing) {
  console.log(thing);
  return thing;
}

function createFridge(data) {
  // sample:
  // data = {
  //   ownerRef: '274361438789698055'
  //   name: 'home',
  //   ingredients: [],
  // };
  return fauna
    .create('fridges', data)
    .then(res => logAndReturn(res[0].ref.id)) // NOTE: needs to be connected to owner on other end
    .catch(err => console.log(err));
}

function getDataFromRef(ref) {
  console.log(`retreiving data for fridge ref ${ref}`);
  return fauna
    .get('fridges', ref)
    .then(res => logAndReturn(res))
    .catch(err => console.log(err));
}

function updateDetails(ref, data) {
  return fauna
    .update('fridges', ref, data)
    .then(res => logAndReturn(res));
}

function deleteFridgeByRef(ref) {
  console.log(`deleting document for ref ${ref}`);
  return fauna
    .delete('fridges', ref);
}

module.exports = {
  createFridge,
  getDataFromRef,
  updateDetails,
  deleteFridgeByRef,
};
