const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRouter = require('../routes/auth');

const createApp = (db) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routes
  app.use(authRouter(db));

  return app;
};

module.exports = createApp;
