/* eslint-disable no-unused-vars */
const FaunaConnection = require('faunadb-connector');

require('dotenv').config();

const fauna = new FaunaConnection({ secret: 'fnADzdzylVACBdT9eJ07EzEivQOq7NjkW62xfh2R' });

function initializeUserCollection() { // creates user collection, with index for all, and 3 users
  const quinn = {
    user: 'Quinn',
    email: 'quinn@gmail.com',
    password: 'secret',
    fridges: [],
  };

  const masha = {
    user: 'Masha',
    email: 'masha@gmail.com',
    password: 'secret',
    fridges: [],
  };

  const nishi = {
    user: 'Nishi',
    email: 'nishi@gmail.com',
    password: 'secret',
    fridges: [],
  };

  fauna
    .createCollection('users')
    .then(collection => {
      console.log(collection);
      fauna
        .createIndex('allUsers', 'users')
        .then(index => {
          console.log(index);
          fauna
            .create('users', quinn)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          fauna
            .create('users', masha)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          fauna
            .create('users', nishi)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function generateUserIndexes() { // createx indexes: userByName and userById
  const userTerm = [
    { field: ['data', 'user'] },
  ];

  const values = [
    { field: ['data', 'user'] },
    { field: ['ref'] },
  ];

  fauna
    .createIndex('userByName', 'users', userTerm, values)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function createWout() {
  const wout = {
    user: 'Wout',
    email: 'wout@gmail.com',
    password: 'secret',
    fridges: [],
  };
  fauna
    .create('users', wout)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function main() {
  initializeUserCollection();
  generateUserIndexes();
  createWout();
}

const fridgeTerm = [
  { field: ['data', 'owner'] },
];

const values = [
  { field: ['data', 'owner'] },
  { field: ['ref'] },
];

function initializeFridgeIndex() {
  fauna
    .createIndex('fridgeByOwner', 'fridges', fridgeTerm, values)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

fauna
  .createIndex('allFridges', 'fridges');
