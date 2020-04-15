const mongoose = require('mongoose');
const validator = require('validator');

const words = require('../configuration/words');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [validator.isURL, words.ARTICLE_LINK_IS_URL],
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, words.ARTICLE_IMAGE_IS_URL],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    select: false,
  },
});

articleSchema.set('versionKey', false);

module.exports = mongoose.model('article', articleSchema);
