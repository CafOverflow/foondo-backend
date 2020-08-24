const recipesService = require('../service/recipesService');

function addFavRecipe(req, res) {
  const { recipe } = req.body;
  // console.log(req.user.id);
  // userRef will be in the auth token
  recipesService.addFavRecipe(req.user.id, recipe);
  res.status(200).json('recipe added to user\'s bookmarks');
}

function removeFavRecipe(req, res) {
  const { recipeId } = req.params;
  // userRef will be in the auth token
  // recipesService.removeFavRecipe(userRef, recipe);
  recipesService.removeFavRecipe(req.user.id, recipeId);
  res.status(200).json('to be implemented');
}

async function getRecipesByIngredients(req, res) {
  const ingredientList = req.query.ingredients
    .split(',')
    .join('%2C');

  const recipeList = await recipesService.getRecipesByIngredients(ingredientList);
  res.status(200).json(recipeList);
}

async function ingredientsAutocomplete(req, res) {
  const queryString = `query=${req.query.query}`;

  const ingredientList = await recipesService.ingredientsAutocomplete(queryString);

  res.status(200).json(ingredientList);
}

async function complexSearch(req, res) {
  const queryString = req.query;

  const keys = Object.keys(queryString);

  const query = keys.map(key => {
    let att = queryString[key];
    att = att.split(',').join('%2C');
    return `${key}=${att}`;
  }).join('&');

  let recipeList = await recipesService.complexSearch(query);
  recipeList = recipeList.results;
  res.status(200).json(recipeList);
}

module.exports = {
  addFavRecipe,
  removeFavRecipe,
  getRecipesByIngredients,
  complexSearch,
  ingredientsAutocomplete,
};
