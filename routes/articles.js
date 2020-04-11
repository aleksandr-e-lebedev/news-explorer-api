const router = require('express').Router();

const {
  getAllMyArticles, createArticle, removeMyArticle,
} = require('../controllers/articlesController');

router
  .route('/')
  .get(getAllMyArticles)
  .post(createArticle);

router
  .route('/:articleId')
  .delete(removeMyArticle);

module.exports = router;
