const dietService = require('../service/dietService');

function setDiet(req, res) {
  const { diet } = req.body;
  dietService.setDietInfo(req.user.id, diet)
    .then(() => res.status(200).send('diet modified'));
}

module.exports = {
  setDiet,
};
