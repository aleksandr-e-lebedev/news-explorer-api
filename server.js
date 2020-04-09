const mongoose = require('mongoose');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'development') dotenv.config();

const app = require('./app');
const config = require('./configuration/config');

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(config.PORT);