const { createLogger, format, transports } = require('winston');

exports.errorLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'error.log' }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  exports.errorLogger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

exports.exceptionLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json(),
  ),
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  exports.exceptionLogger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}
