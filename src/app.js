require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sentry = require('@sentry/node');
const recipesController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');

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

/* ROUTES */

/* user */
app.post('/user', userController.createUser);
app.post('/login', authController.login);
app.use(authMiddleware.authenticateToken);
app.get('/user/:name', userController.getUser);
app.delete('/user/:name', userController.deleteUser);

/* recipes */
// app.post('/recipes/:recipeId', recipesController.addFavRecipe);
app.post('/recipes/bookmarks/', recipesController.addFavRecipe); // requires full recipe object in req.body.recipe
app.delete('/recipes/bookmarks/:recipeId', recipesController.removeFavRecipe);
app.get('/recipes', recipesController.getRecipesByIngredients);
app.get('/recipes/complexSearch', recipesController.complexSearch);
app.get('/food/ingredients/autocomplete', recipesController.ingredientsAutocomplete);

/* ERROR HANDLING */
app.get('/debug-sentry', () => {
  throw new Error('Sentry error:');
});
app.use(sentry.Handlers.errorHandler());

app.use(errorHandlerMiddleware.handle);

module.exports.app = app;
