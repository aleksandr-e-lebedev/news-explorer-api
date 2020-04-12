const mongoose = require('mongoose');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'development') dotenv.config();

const logger = require('./utils/serverLogger');

process.on('uncaughtException', (err) => {
  logger.exceptionLogger.error(err);
});

const app = require('./app');
const config = require('./configuration/config');

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const server = app.listen(config.PORT);

process.on('unhandledRejection', (err) => {
  logger.errorLogger.error(err);
  server.close(() => {
    process.exit(1);
  });
});
