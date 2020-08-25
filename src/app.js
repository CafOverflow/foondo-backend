require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sentry = require('@sentry/node');
const cors = require('cors');
const recipesController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
// const dietController = require('./controllers/dietController');

const app = express();

sentry.init({ dsn: process.env.SENTRY_INIT });

app.use(cors());

app.use(sentry.Handlers.requestHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ROUTES */

/* user */
app.post('/user', userController.createUser);
app.post('/login', authController.login);
app.use(authMiddleware.authenticateToken);
app.get('/user', userController.getUser);
app.delete('/user', userController.deleteUser);

/* recipes */
app.post('/recipes/bookmarks/', recipesController.addFavRecipe); // requires full recipe object in req.body.recipe
app.delete('/recipes/bookmarks/:recipeId', recipesController.removeFavRecipe);
app.get('/recipes/bookmarks/', recipesController.getBookmarks);
app.get('/recipes/searchByIngredients/:ingredients', recipesController.getRecipesByIngredients);
app.get('/recipes/complexSearch', recipesController.complexSearch);
app.get('/food/ingredients/autocomplete', recipesController.ingredientsAutocomplete);

/* diet */
// app.get('/user/diet', dietController.get)
// app.post('/user/diet', dietController.setDiet);

/* ERROR HANDLING */
app.get('/debug-sentry', () => {
  throw new Error('Sentry error:');
});
app.use(sentry.Handlers.errorHandler());

app.use(errorHandlerMiddleware.handle);

module.exports.app = app;
