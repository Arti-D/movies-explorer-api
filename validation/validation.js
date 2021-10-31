const { celebrate, Joi } = require('celebrate');

const validateNewUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
      name: Joi.string().min(2).max(30),
    }),
});

const validateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
});

const validateNewMovie = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-azA-Z0-9()@:%_.+~#?&/=]*)/m),
    }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    params: {
      cardId: Joi.string().required().hex().length(24),
    },
  }),
});

module.exports = {
  validateNewUser,
  validateUser,
  validateNewMovie,
  validateCard,
};
