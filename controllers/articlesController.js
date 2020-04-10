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
