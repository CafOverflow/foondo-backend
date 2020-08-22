require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sentry = require('@sentry/node');
// const db = require('./controllers/dbController');
const recipesController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

sentry.init({ dsn: process.env.SENTRY_INIT });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(sentry.Handlers.requestHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* DB TEST */
// app.post('/names', (req, res) => {
//   console.log('db.addEntry');
//   db.addEntry(req.body, data => {
//     console.log(data);
//     res.status(200)
//       .send();
//   });
// });

// app.get('/names', (req, res) => {
//   console.log('db.readAll');
//   db.readlAll(data => {
//     console.log(data);
//     res.json(data);
//   });
// });

/* ROUTES */

/* user */
app.post('/user', userController.createUser);
app.get('/user/:name', userController.getUser);
app.delete('/user/:name', userController.deleteUser);

/* recipes */
app.post('/recipes/:id');
app.post('/recipes/:id');
app.get('/recipes', recipesController.getRecipesByIngredients);
app.get('/recipes/complexSearch', recipesController.complexSearch);
app.get('/food/ingredients/autocomplete', recipesController.ingredientsAutocomplete);

/* ERROR HANDLING */
app.get('/debug-sentry', () => {
  throw new Error('Sentry error:');
});
app.use(sentry.Handlers.errorHandler());

app.use(errorHandler.handle);

module.exports.app = app;
