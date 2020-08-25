const userDb = require('../db/userDb');

function getDietInfo(userRef) {
  return userDb.getDiet(userRef);
}

function setDietInfo(userRef, data) {
  return userDb.updateDetails(userRef, data);
}

function getIntolerancesInfo(userRef) {
  return userDb.getIntolerances(userRef);
}

function setIntolerancesInfo(userRef, data) {
  return userDb.updateDetails(userRef, data);
}

module.exports = {
  getDietInfo,
  setDietInfo,
  getIntolerancesInfo,
  setIntolerancesInfo,
};
