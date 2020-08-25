const userDb = require('../db/userDb');

function getDietInfo(userRef) {
  return userDb.getDiet(userRef);
}

function setDietInfo(userRef, data) {
  return userDb.updateDetails(data);
}

module.exports = {
  getDietInfo,
  setDietInfo,
};
