const recipesService = require('../service/recipesService');

function addFavRecipe(req, res, next) {
  const { recipe } = req.body;
  recipe.id = String(recipe.id);
  try {
    recipesService.addFavRecipe(req.user.id, recipe).catch(err => { next(err); });
  } catch (err) {
    next(err);
  }
  res.status(204).send();
}

function removeFavRecipe(req, res, next) {
  const { recipeId } = req.params;
  console.log(`trying to delete bookmark ${recipeId}`);
  recipesService.removeFavRecipe(req.user.id, recipeId)
    .then(() => res.status(204).send())
    .catch(err => { next(err); });
}

function getBookmarks(req, res, next) {
  recipesService.getBookmarks(req.user.id)
    .then(data => res.status(200).json(data))
    .catch(err => { next(err); });
}

async function getRecipesByIngredients(req, res, next) {
  const ingredientList = req.params.ingredients;
  try {
    const recipeList = await recipesService.getRecipesByIngredients(ingredientList);
    res.status(200).json(recipeList);
  } catch (err) {
    next(err);
  }
}

async function ingredientsAutocomplete(req, res, next) {
  const queryString = `${req.params.ingredient}`;

  try {
    const ingredientList = await recipesService.ingredientsAutocomplete(queryString);
    res.status(200).json(ingredientList);
  } catch (err) {
    next(err);
  }
}

async function complexSearch(req, res, next) {
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

  try {
    const recipeList = await recipesService.complexSearch(query);
    res.status(200).json(recipeList);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addFavRecipe,
  removeFavRecipe,
  getRecipesByIngredients,
  complexSearch,
  ingredientsAutocomplete,
  getBookmarks,
};
