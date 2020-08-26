const dietService = require('../service/dietService');

function setDiet(req, res) {
  const { diet } = req.body;
  dietService.setDietInfo(req.user.id, { diet })
    .then(() => res.status(204).send())
    .catch(err => { throw err; });
}

function getDiet(req, res) {
  dietService.getDietInfo(req.user.id)
    .then(data => res.status(200).json({ diet: data }))
    .catch(err => { throw err; });
}

function setIntolerances(req, res) {
  const { intolerances } = req.body;
  dietService.setIntolerancesInfo(req.user.id, { intolerances })
    .then(() => res.status(204).send())
    .catch(err => { throw err; });
}

function getIntolerances(req, res) {
  dietService.getIntolerancesInfo(req.user.id)
    .then(data => res.status(200).json({ intolerances: data }))
    .catch(err => { throw err; });
}

module.exports = {
  setDiet,
  getDiet,
  getIntolerances,
  setIntolerances,
};
