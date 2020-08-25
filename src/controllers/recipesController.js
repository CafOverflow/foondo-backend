const recipesService = require('../service/recipesService');

function addFavRecipe(req, res) {
  const { recipe } = req.body;
  recipe.id = String(recipe.id);
  // userRef will be in the auth token
  try {
    recipesService.addFavRecipe(req.user.id, recipe);
  } catch (err) {
    console.log(err);
  }
  res.status(204).send();
}

function removeFavRecipe(req, res) {
  const { recipeId } = req.params;
  console.log(`trying to delete bookmark ${recipeId}`);
  // userRef will be in the auth token
  // recipesService.removeFavRecipe(userRef, recipe);
  recipesService.removeFavRecipe(req.user.id, recipeId);
  res.status(204).send();
}

function getBookmarks(req, res) {
  recipesService.getBookmarks(req.user.id)
    .then(data => res.status(200).json(data));
}

async function getRecipesByIngredients(req, res) {
  const ingredientList = req.params.ingredients;

  const recipeList = await recipesService.getRecipesByIngredients(ingredientList);
  res.status(200).json(recipeList);
}

async function ingredientsAutocomplete(req, res) {
  const queryString = `${req.params.ingredient}`;

  const ingredientList = await recipesService.ingredientsAutocomplete(queryString);

  res.status(200).json(ingredientList);
}

async function complexSearch(req, res) {
  const queryString = req.query;

  const keys = Object.keys(queryString);

  const query = keys.map(key => {
    let att = queryString[key];
    if (key !== 'intolerances' || key !== 'cuisine' || key !== 'includeIngredients') {
      att = att.split(',').join('%2C');
    }
    att = att.split(' ').join('');
    return `${key}=${att}`;
  }).join('&');

  const recipeList = await recipesService.complexSearch(query);
  res.status(200).json(recipeList);
}

module.exports = {
  addFavRecipe,
  removeFavRecipe,
  getRecipesByIngredients,
  complexSearch,
  ingredientsAutocomplete,
  getBookmarks,
};
