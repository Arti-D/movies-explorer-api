const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const authoriziationRoter = require('./authorithation');
const auth = require('../middlewares/auth');

router.use('/', authoriziationRoter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', movieRouter);

module.exports = router;
