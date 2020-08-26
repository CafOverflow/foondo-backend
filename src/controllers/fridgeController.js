/* eslint-disable no-param-reassign */
const fridgeService = require('../service/fridgeService');

function addIngredients(req, res) {
  const { ingredients } = req.body;
  const stringedIngredients = ingredients.map(item => { item.id = String(item.id); return item; });
  try {
    fridgeService.addIngredients(req.user.id, stringedIngredients)
      .then(() => res.status(204).send())
      .catch(err => { throw err; });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function removeIngredients(req, res) {
  const { ingredientIds } = req.body;
  console.log('trying to remove ingredients');
  fridgeService.removeIngredients(req.user.id, ingredientIds)
    .then(() => res.status(204).send())
    .catch(err => { throw err; });
}

function getFridgeContents(req, res) {
  fridgeService.getFridgeContents(req.user.id)
    .then(data => res.status(200).json(data))
    .catch(err => { throw err; });
}

module.exports = {
  addIngredients,
  removeIngredients,
  getFridgeContents,
};
