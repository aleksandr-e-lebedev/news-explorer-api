const router = require('express').Router();

const {
  getMe,
} = require('../controllers/usersController');

router.get('/me', getMe);

module.exports = router;
