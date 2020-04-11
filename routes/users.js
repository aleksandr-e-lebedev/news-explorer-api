const router = require('express').Router();

const {
  getMe,
} = require('../controllers/usersController');

const auth = require('../middlewares/auth');

router.get('/me', auth, getMe);

module.exports = router;
