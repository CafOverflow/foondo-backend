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
const dietController = require('./controllers/dietController');
const fridgeController = require('./controllers/fridgeController');

const app = express();

sentry.init({ dsn: process.env.SENTRY_INIT });

app.use(cors());

app.use(sentry.Handlers.requestHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ROUTES */

/* user */
// request body must include { data: { email: kappa, password: kappa}}
// returns 201
app.post('/user', userController.createUser);

// request body must include { data: { email: kappa, password: kappa}}
// returns 201 with { jwt: kappa }
app.post('/login', authController.login);

app.use(authMiddleware.authenticateToken);
app.get('/user', userController.getUser);
app.delete('/user', userController.deleteUser);

// general rules for user management of recipes and ingredients:
// POST requests require one or more full objects, with an ID field
// DELETE requests require one or more IDs
// recipe endpoints accept one single object/ID per request
// ingredient endpoints accept arrays of objects/IDs

/* recipes */
app.post('/recipes/bookmarks/', recipesController.addFavRecipe);
app.delete('/recipes/bookmarks/:recipeId', recipesController.removeFavRecipe);
app.get('/recipes/bookmarks/', recipesController.getBookmarks);
app.get('/recipes/searchByIngredients/:ingredients', recipesController.getRecipesByIngredients);
app.get('/recipes/complexSearch', recipesController.complexSearch);
app.get('/food/ingredients/autocomplete/:ingredient', recipesController.ingredientsAutocomplete);

/* diet */
app.get('/user/diet', dietController.getDiet);
app.post('/user/diet', dietController.setDiet);
app.get('/user/intolerances', dietController.getIntolerances);
app.post('/user/intolerances', dietController.setIntolerances);

/* fridge */
app.get('/user/fridge', fridgeController.getFridgeContents);
app.post('/user/fridge', fridgeController.addIngredients);
app.delete('/user/fridge', fridgeController.removeIngredients);

/* ERROR HANDLING */
app.get('/debug-sentry', () => {
  throw new Error('Sentry error:');
});
app.use(sentry.Handlers.errorHandler());

app.use(errorHandlerMiddleware.handle);

module.exports.app = app;
