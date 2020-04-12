const rateLimit = require('express-rate-limit');

const config = require('../configuration/config');
const words = require('../configuration/words');

module.exports = rateLimit({
  windowMs: 1000 * 60 * config.RATE_LIMIT_WINDOW,
  max: config.RATE_LIMIT_MAX,
  message: {
    status: 'fail',
    message: words.TOO_MANY_REQUESTS,
  },
});
