const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const rateLimiter = require('./middlewares/rateLimiter');
const logger = require('./middlewares/appLogger');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(rateLimiter);

app.use(express.json());

app.use(logger.requestLogger);
app.use(routes);

app.use(logger.errorLogger);
app.use(errorHandler);

module.exports = app;
