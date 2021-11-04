const router = require('express').Router();
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', usersController.login);
router.post('/signup', usersController.createUser);
router.use(auth);
router.head('/logout', usersController.logOut);

module.exports = router;
