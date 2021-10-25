const Movie = require('../models/movie');

// ОШИБКИ

// FUNCTIONS
const getMovies = (req, res, next) => {
  Movie.find({ 'owner._id': req.user._id })
    .then((cards) => res.status().send({ data: cards }))
    .catch((err) => next(err));
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
  deleteMovie,
};
