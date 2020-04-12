const express = require('express');

const routes = require('./routes');
const logger = require('./middlewares/appLogger');

const app = express();

app.use(express.json());

app.use(logger.requestLogger);
app.use(routes);

module.exports = app;
