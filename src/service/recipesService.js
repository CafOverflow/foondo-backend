const spoonacular = require('../client/spoonacularClient');
const userDb = require('../db/userDb');

const returnedQuantity = 10;

function addFavRecipe(userRef, recipe) {
  if ('id' in recipe) {
    return userDb.addFavRecipe(userRef, recipe);
  }
  throw new Error('Invalid recipe structure - must have ID');
}

function removeFavRecipe(userRef, recipe) {
  try {
    userDb.removeFavRecipe(userRef, recipe);
  } catch (e) {
    throw new Error('failed to remove favourite recipe - check that it is actually bookmarked');
  }
}

async function getRecipesByIngredients(ingredientList) {
  const path = 'recipes/findByIngredients';
  const query = `number=${returnedQuantity}&ranking=1&ingredients=${ingredientList}`;

  const { body, status } = await spoonacular.get(path, query);

  if (status === 200) {
    return body;
  } if (status === 404) {
    return {};
  }
  throw new Error('Error occurred while trying to fetch from Spoonacular');
}

async function ingredientsAutocomplete(queryString) {
  const path = 'food/ingredients/autocomplete';
  const query = `${queryString}&number=${returnedQuantity}&metaInformation=true`;

  const { body, status } = await spoonacular.get(path, query);

  if (status === 200) {
    return body;
  } if (status === 404) {
    return {};
  }
  throw new Error('Error occurred while trying to fetch from Spoonacular');
}

async function complexSearch(queryString) {
  const path = 'recipes/complexSearch';
  const query = `${queryString}&number=${returnedQuantity}&instructionsRequired=true&addRecipeInformation=true`;

  const { body, status } = await spoonacular.get(path, query);

  if (status === 200) {
    return body;
  } if (status === 404) {
    return {};
  }
  throw new Error('Error occurred while trying to fetch from Spoonacular');
}

module.exports = {
  addFavRecipe,
  removeFavRecipe,
  getRecipesByIngredients,
  ingredientsAutocomplete,
  complexSearch,
};
