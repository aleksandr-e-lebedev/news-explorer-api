const { celebrate, Joi, Segments } = require('celebrate');

const words = require('../configuration/words');

const messages = {
  name: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.USER_NAME_REQUIRED,
    'string.empty': words.USER_NAME_REQUIRED,
    'string.min': words.USER_NAME_MIN_LENGTH,
    'string.max': words.USER_NAME_MAX_LENGTH,
  },
  email: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.USER_EMAIL_REQUIRED,
    'string.empty': words.USER_EMAIL_REQUIRED,
    'string.email': words.USER_EMAIL_IS_EMAIL,
  },
  password: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.USER_PASSWORD_REQUIRED,
    'string.empty': words.USER_PASSWORD_REQUIRED,
    'string.min': words.USER_PASSWORD_MIN_LENGTH,
  },
};

exports.createUserReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages(messages.name),
    email: Joi.string()
      .required()
      .email()
      .messages(messages.email),
    password: Joi.string()
      .required()
      .min(8)
      .messages(messages.password),
  }).prefs({ stripUnknown: true }),
});

exports.loginReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .required()
      .email()
      .messages(messages.email),
    password: Joi.string()
      .required()
      .min(8)
      .messages(messages.password),
  }).prefs({ stripUnknown: true }),
});

exports.authHeaderReqCheck = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string()
      .required()
      .pattern(/^Bearer /),
  }).unknown(),
});
