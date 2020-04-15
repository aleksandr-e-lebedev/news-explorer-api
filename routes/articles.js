const router = require('express').Router();

const {
  getAllMyArticles, createArticle, removeMyArticle,
} = require('../controllers/articlesController');

const {
  createArticleReqCheck, articleIdReqCheck,
} = require('../middlewares/articlesPreValidator');

const auth = require('../middlewares/auth');

const {
  authHeaderReqCheck,
} = require('../middlewares/authPreValidator');

router
  .route('/')
  .get(authHeaderReqCheck, auth, getAllMyArticles)
  .post(authHeaderReqCheck, auth, createArticleReqCheck, createArticle);

router
  .route('/:articleId')
  .delete(authHeaderReqCheck, auth, articleIdReqCheck, removeMyArticle);

module.exports = router;
