const router = require('express').Router();

const {
  authHeaderReqCheck,
} = require('../middlewares/authPreValidator');

const auth = require('../middlewares/auth');
const words = require('../configuration/words');
const NotFoundError = require('../errors/NotFoundError');

const getErrorPage = (req, res, next) => {
  next(new NotFoundError(`${words.NOT_FOUND}: ${req.originalUrl}`));
};

router.use(authHeaderReqCheck, auth, getErrorPage);

module.exports = router;
