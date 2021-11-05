const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { validateMovie, validateNewMovie } = require('../validation/validation');

router.get('/', moviesController.getMovies);
router.post('/', validateNewMovie, moviesController.createMovie);
router.delete('/:movieId', validateMovie, moviesController.deleteMovie);

module.exports = router;
