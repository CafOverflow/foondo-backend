/* eslint-disable no-param-reassign */
const fridgeService = require('../service/fridgeService');

function addIngredients(req, res, next) {
  const { ingredients } = req.body;
  const stringedIngredients = ingredients.map(item => { item.id = String(item.id); return item; });
  fridgeService.addIngredients(req.user.id, stringedIngredients)
    .then(() => res.status(204).send())
    .catch(err => { next(err); });
}

function removeIngredients(req, res, next) {
  const { ingredientIds } = req.body;
  fridgeService.removeIngredients(req.user.id, ingredientIds)
    .then(() => res.status(204).send())
    .catch(err => { next(err); });
}

function getFridgeContents(req, res, next) {
  fridgeService.getFridgeContents(req.user.id)
    .then(data => res.status(200).json(data))
    .catch(err => { next(err); });
}

module.exports = {
  addIngredients,
  removeIngredients,
  getFridgeContents,
};
