const Article = require('../models/article');
const catchAsync = require('../utils/catchAsync');

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
