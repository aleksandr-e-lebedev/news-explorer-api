const { celebrate, Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const words = require('../configuration/words');

const messages = {
  keyword: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_KEYWORD_REQUIRED,
    'string.empty': words.ARTICLE_KEYWORD_REQUIRED,
  },
  title: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_TITLE_REQUIRED,
    'string.empty': words.ARTICLE_TITLE_REQUIRED,
  },
  text: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_TEXT_REQUIRED,
    'string.empty': words.ARTICLE_TEXT_REQUIRED,
  },
  date: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_DATE_REQUIRED,
    'string.empty': words.ARTICLE_DATE_REQUIRED,
  },
  source: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_SOURCE_REQUIRED,
    'string.empty': words.ARTICLE_SOURCE_REQUIRED,
  },
  link: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_LINK_REQUIRED,
    'string.empty': words.ARTICLE_LINK_REQUIRED,
    'string.uri': words.ARTICLE_LINK_IS_URL,
    'string.pattern.base': words.ARTICLE_LINK_IS_URL,
  },
  image: {
    'string.base': words.INVALID_REQUEST,
    'any.required': words.ARTICLE_IMAGE_REQUIRED,
    'string.empty': words.ARTICLE_IMAGE_REQUIRED,
    'string.uri': words.ARTICLE_IMAGE_IS_URL,
    'string.pattern.base': words.ARTICLE_IMAGE_IS_URL,
  },
};

const urlPattern = /^https?:\/\/(w{3}\.)?(\d{1,3}(\.\d{1,3}){3}|([\w-]{1,63}\.)*[\w-]{2,63}\.[a-z]{2,})(:\d{2,5})?(\/[a-z\d]+#?)*/;

exports.createArticleReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    keyword: Joi.string()
      .required()
      .messages(messages.keyword),
    title: Joi.string()
      .required()
      .messages(messages.title),
    text: Joi.string()
      .required()
      .messages(messages.text),
    date: Joi.string()
      .required()
      .messages(messages.date),
    source: Joi.string()
      .required()
      .messages(messages.source),
    link: Joi.string()
      .required()
      .uri()
      .pattern(urlPattern)
      .messages(messages.link),
    image: Joi.string()
      .required()
      .uri()
      .pattern(urlPattern)
      .messages(messages.image),
  }).prefs({ stripUnknown: true }),
});

exports.articleIdReqCheck = celebrate({
  [Segments.PARAMS]: Joi.object({
    articleId: Joi.objectId()
      .message(words.INVALID_REQUEST),
  }),
});
