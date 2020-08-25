const spoonacular = require('../client/spoonacularClient');
const userDb = require('../db/userDb');

const returnedQuantity = 10;

function addFavRecipe(userRef, recipe) {
  if (recipe && recipe.id) {
    return userDb.addFavRecipe(userRef, recipe);
  }
  throw new Error('Invalid recipe structure - must have ID');
}

function removeFavRecipe(userRef, recipe) {
  try {
    return userDb.removeFavRecipe(userRef, recipe);
  } catch (e) {
    throw new Error('failed to remove favourite recipe - check that it is actually bookmarked');
  }
}

function getBookmarks(userRef) {
  return userDb.getDataFromRef(userRef)
    .then(data => data.data.recipes);
}

async function getRecipesByIngredients(ingredientList) {
  const path = 'recipes/findByIngredients';
  const query = `number=${returnedQuantity}&ranking=1&ingredients=${ingredientList}&ignorePantry=true`;

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
  const query = `query=${queryString}&number=${returnedQuantity}&metaInformation=true`;

  const { body, status } = await spoonacular.get(path, query);

  const parsedBody = body.map(ingredient => {
    const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
    return {
      name: ingredient.name,
      image: imageUrl,
      id: ingredient.id,
    };
  });

  if (status === 200) {
    return parsedBody;
  } if (status === 404) {
    return {};
  }
  throw new Error('Error occurred while trying to fetch from Spoonacular');
}

async function complexSearch(queryString) {
  const path = 'recipes/complexSearch';
  const query = `${queryString}&number=${returnedQuantity}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&ignorePantry=true`;

  const { body, status } = await spoonacular.get(path, query);

  const { results } = body;
  const parsedBody = results.map(item => {
    /* ingredients */
    const ingredients = item.extendedIngredients.map(ingredient => {
      const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
      return {
        id: ingredient.id,
        image: imageUrl,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        measures: {
          us: {
            amount: ingredient.measures.us.amount,
            unitShort: ingredient.measures.us.unitShort,
            unitLong: ingredient.measures.us.unitLong,
          },
          metric: {
            amount: ingredient.measures.metric.amount,
            unitShort: ingredient.measures.metric.unitShort,
            unitLong: ingredient.measures.metric.unitLong,
          },
        },
      };
    });

    const instructions = item.analyzedInstructions[0].steps.map(instruction => {
      const instructionEquipment = instruction.equipment.map(equipment => {
        const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${equipment.image}`;
        return {
          id: equipment.id,
          name: equipment.name,
          localizedName: equipment.localizedName,
          image: imageUrl,
        };
      });

      const instructionIngredients = instruction.ingredients.map(ingredient => {
        const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
        return {
          id: ingredient.id,
          name: ingredient.name,
          localizedName: ingredient.localizedName,
          image: imageUrl,
        };
      });

      return {
        number: instruction.number,
        step: instruction.step,
        equipment: instructionEquipment,
        ingredients: instructionIngredients,
      };
    });

    return {
      id: item.id,
      title: item.title,
      readyInMinutes: item.readyInMinutes,
      servings: item.servings,
      sourceUrl: item.sourceUrl,
      image: item.image,
      summary: item.summary,
      vegetarian: item.vegetarian,
      vegan: item.vegan,
      glutenFree: item.glutenFree,
      dairyFree: item.dairyFree,
      preparationMinutes: item.preparationMinutes,
      cookingMinutes: item.cookingMinutes,
      extendedIngredients: ingredients,
      cuisines: item.cuisines,
      dishTypes: item.dishTypes,
      diets: item.diets,
      occasions: item.occasions,
      analyzedInstructions: instructions,
      usedIngredientCount: item.usedIngredientCount,
      missedIngredientCount: item.missedIngredientCount,
      missedIngredients: item.missedIngredients,
      usedIngredients: item.usedIngredients,
      unusedIngredients: item.unusedIngredients,
    };
  });

  if (status === 200) {
    return parsedBody;
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
  getBookmarks,
};
