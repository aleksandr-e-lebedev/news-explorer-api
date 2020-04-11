const router = require('express').Router();

const {
  createUser, login,
} = require('../controllers/authController');

router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
