const dietService = require('../service/dietService');

function setDiet(req, res, next) {
  const { diet } = req.body;
  dietService.setDietInfo(req.user.id, { diet })
    .then(() => res.status(204).send())
    .catch(err => { next(err); });
}

function getDiet(req, res, next) {
  dietService.getDietInfo(req.user.id)
    .then(data => res.status(200).json({ diet: data }))
    .catch(err => { next(err); });
}

function setIntolerances(req, res, next) {
  const { intolerances } = req.body;
  if (typeof intolerances === 'object') {
    res.status(500).send();
    return;
  }
  dietService.setIntolerancesInfo(req.user.id, { intolerances })
    .then(() => res.status(204).send())
    .catch(err => { next(err); });
}

function getIntolerances(req, res, next) {
  dietService.getIntolerancesInfo(req.user.id)
    .then(data => res.status(200).json({ intolerances: data }))
    .catch(err => { next(err); });
}

module.exports = {
  setDiet,
  getDiet,
  getIntolerances,
  setIntolerances,
};
