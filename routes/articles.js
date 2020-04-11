const router = require('express').Router();

const {
  getAllMyArticles, createArticle, removeMyArticle,
} = require('../controllers/articlesController');

const {
  createArticleReqCheck, articleIdReqCheck,
} = require('../middlewares/articlesPreValidator');

router
  .route('/')
  .get(getAllMyArticles)
  .post(createArticleReqCheck, createArticle);

router
  .route('/:articleId')
  .delete(articleIdReqCheck, removeMyArticle);

module.exports = router;
