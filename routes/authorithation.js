const router = require('express').Router();
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateNewUser } = require('../validation/validation');

router.post('/signin', validateNewUser, usersController.login);
router.post('/signup', validateNewUser, usersController.createUser);
router.use(auth);
router.head('/logout', usersController.logOut);

module.exports = router;
