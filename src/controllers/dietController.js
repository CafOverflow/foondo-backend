const dietService = require('../service/dietService');

function setDiet(req, res) {
  const { diet } = req.body;
  dietService.setDietInfo(req.user.id, { diet })
    .then(() => res.status(204).send());
}

function getDiet(req, res) {
  dietService.getDietInfo(req.user.id)
    .then(data => res.status(200).json({ diet: data }));
}

function setIntolerances(req, res) {
  const { intolerances } = req.body;
  dietService.setIntolerancesInfo(req.user.id, { intolerances })
    .then(() => res.status(204).send());
}

function getIntolerances(req, res) {
  dietService.getIntolerancesInfo(req.user.id)
    .then(data => res.status(200).json({ intolerances: data }));
}

module.exports = {
  setDiet,
  getDiet,
  getIntolerances,
  setIntolerances,
};
