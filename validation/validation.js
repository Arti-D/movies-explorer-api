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
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-azA-Z0-9()@:%_.+~#?&/=]*)/m),
      trailer: Joi.string().required().pattern(/http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-azA-Z0-9()@:%_.+~#?&/=]*)/m),
      thumbnail: Joi.string().required().pattern(/http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-azA-Z0-9()@:%_.+~#?&/=]*)/m),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    params: {
      movieId: Joi.string().required().hex().length(24),
    },
  }),
});

module.exports = {
  validateNewUser,
  validateUser,
  validateNewMovie,
  validateMovie,
};
