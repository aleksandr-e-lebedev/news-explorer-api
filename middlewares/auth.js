const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const config = require('../configuration/config');

module.exports = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  const payload = await promisify(jwt.verify)(token, config.JWT_SECRET);

  req.user = payload;

  next();
});
