const { isCelebrate } = require('celebrate');

const words = require('../configuration/words');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const handleCelebrateError = (err) => {
  let error = {};

  error = err.message.includes('authorization')
    ? new UnauthorizedError(words.AUTH_REQUIRED)
    : new BadRequestError(err.message);

  return error;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `${words.INVALID_INPUT_DATA}. ${errors.join('. ')}`;

  return new BadRequestError(message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"(.*)"/)[1];
  const message = `${value} - ${words.DUPLICATE_FIELD_VALUE}`;

  return new ConflictError(message);
};

const handleJWTError = () => {
  const message = words.INVALID_TOKEN;

  return new UnauthorizedError(message);
};

const handleJWTExpiredError = () => {
  const message = words.EXPIRED_TOKEN;

  return new UnauthorizedError(message);
};

const createError = (err) => {
  let error = { ...err };

  if (isCelebrate(error)) error = handleCelebrateError(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  return error;
};

const sendErrorDev = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      status: `${err.statusCode}`.startsWith('4') ? 'fail' : 'error',
      message: err.message,
      name: err.name,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(500).send({
      status: 'error',
      message: words.SERVER_ERROR,
      name: err.name,
      error: err,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      status: `${err.statusCode}`.startsWith('4') ? 'fail' : 'error',
      message: err.message,
    });
  } else {
    res.status(500).send({
      status: 'error',
      message: words.SERVER_ERROR,
    });
  }
};

module.exports = (err, req, res, next) => {
  const error = { ...err };

  error.message = err.message;
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(createError(error), res);
  } else {
    sendErrorProd(createError(error), res);
  }

  next();
};
