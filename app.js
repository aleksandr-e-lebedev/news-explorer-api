const express = require('express');
const helmet = require('helmet');

const routes = require('./routes');
const logger = require('./middlewares/appLogger');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(logger.requestLogger);
app.use(routes);

app.use(logger.errorLogger);
app.use(errorHandler);

module.exports = app;
