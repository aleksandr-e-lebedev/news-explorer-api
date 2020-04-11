const router = require('express').Router();

const {
  getAllMyArticles, createArticle, removeMyArticle,
} = require('../controllers/articlesController');

const {
  createArticleReqCheck, articleIdReqCheck,
} = require('../middlewares/articlesPreValidator');

const auth = require('../middlewares/auth');

router
  .route('/')
  .get(auth, getAllMyArticles)
  .post(auth, createArticleReqCheck, createArticle);

router
  .route('/:articleId')
  .delete(auth, articleIdReqCheck, removeMyArticle);

module.exports = router;
