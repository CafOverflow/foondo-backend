require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sentry = require('@sentry/node');
// const db = require('./db/db');
const recipesController = require('./controllers/recipesController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

sentry.init({ dsn: process.env.SENTRY_INIT });

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
