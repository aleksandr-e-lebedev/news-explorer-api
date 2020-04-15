const router = require('express').Router();

const {
  createUser, login,
} = require('../controllers/authController');

const {
  createUserReqCheck, loginReqCheck,
} = require('../middlewares/authPreValidator');

router.post('/signup', createUserReqCheck, createUser);
router.post('/signin', loginReqCheck, login);

module.exports = router;
