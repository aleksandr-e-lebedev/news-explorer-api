const winston = require('winston');
const expressWinston = require('express-winston');

exports.requestLogger = expressWinston.logger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
});
