const recipesService = require('../service/recipesService');

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
  getRecipesByIngredients,
  complexSearch,
  ingredientsAutocomplete,
};
