const Joi = require('@hapi/joi');
const authService = require('../service/authService');

function validateInput(userData) {
  const itemSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });

  const validated = itemSchema.validate(userData);
  if (validated.error) {
    const errorMessage = validated.error.details.map(d => d.message);
    const error = new Error(errorMessage);
    error.statusCode = 400;
    throw error;
  }
}

async function login(req, res, next) {
  try {
    validateInput(req.body.data);

    const { email } = req.body.data;
    const { password } = req.body.data;
    const jwt = await authService.authenticate(email, password);
    res.status(201).json({ jwt });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
};
