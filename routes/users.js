const router = require('express').Router();

const {
  getMe,
} = require('../controllers/usersController');

const auth = require('../middlewares/auth');

const {
  authHeaderReqCheck,
} = require('../middlewares/authPreValidator');

router.get('/me', authHeaderReqCheck, auth, getMe);

module.exports = router;
