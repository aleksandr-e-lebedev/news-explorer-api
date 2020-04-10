const Article = require('../models/article');
const catchAsync = require('../utils/catchAsync');
const words = require('../configuration/words');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

exports.getAllMyArticles = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const articles = await Article.find({ owner });

  res.send({
    status: 'success',
    results: articles.length,
    data: { articles },
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const article = await Article.create({ ...req.body, owner });

  article.owner = undefined;

  res.status(201).send({
    status: 'success',
    data: { article },
  });
});

exports.removeMyArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params;

  const article = await Article.findById(articleId)
    .select('+owner')
    .orFail(new NotFoundError(words.ARTICLE_NOT_FOUND));

  const user = req.user._id;
  const owner = article.owner._id.toString();

  if (user === owner) {
    article.remove();

    res.send({
      status: 'success',
      message: words.ARTICLE_REMOVED,
    });
  } else {
    next(new ForbiddenError(words.NOT_ENOUGH_RIGHTS));
  }
});
