const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAuthRouter = require('../routes/auth');
const createUserRepository = require('../repositories/usersRepository');

const createApp = (db) => {
  const usersRepository = createUserRepository(db);
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routes
  app.use(createAuthRouter(usersRepository));

  return app;
};

module.exports = createApp;
