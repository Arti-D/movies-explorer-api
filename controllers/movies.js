const Movie = require('../models/movie');

// ОШИБКИ
const NotFoundError = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');
const BadRequestErr = require('../errors/BadRequestErr');

const successCode = require('../errors/status-codes/success-codes');

// FUNCTIONS
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.status(successCode.SUCCESS_CODE).send({ data: cards }))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  }).then((movie) => res.status(successCode.SUCCESS_CODE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (!movie.owner._id.equals(req.user._id)) {
        throw new ForbiddenErr('Доступ ограничен');
      }
      movie.deleteOne(movie).then(() => {
        res.status(successCode.SUCCESS_CODE).send(movie);
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
