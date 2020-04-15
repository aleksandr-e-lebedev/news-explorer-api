const jwt = require('jsonwebtoken');

const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const config = require('../configuration/config');
const words = require('../configuration/words');
const UnauthorizedError = require('../errors/UnauthorizedError');

const signToken = (_id) => jwt.sign(
  { _id },
  config.JWT_SECRET,
  { expiresIn: config.JWT_EXPIRES_IN },
);

const createSendToken = (res, statusCode, user) => {
  const token = signToken(user._id);

  res.status(statusCode).send({
    status: 'success',
    token,
    data: { user },
  });
};

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  user.password = undefined;

  res.status(201).send({
    status: 'success',
    data: { user },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError(words.INVALID_EMAIL_OR_PASSWORD));

  const correctPassword = await user.isPasswordCorrect(password, user.password);

  if (!correctPassword) {
    next(new UnauthorizedError(words.INVALID_EMAIL_OR_PASSWORD));
    return;
  }

  user.password = undefined;

  createSendToken(res, 200, user);
});
