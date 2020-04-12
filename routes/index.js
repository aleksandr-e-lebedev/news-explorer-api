const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const articles = require('./articles');
const errorPage = require('./errorPage');

router.use('/', auth);
router.use('/users', users);
router.use('/articles', articles);
router.use('/', errorPage);

module.exports = router;
