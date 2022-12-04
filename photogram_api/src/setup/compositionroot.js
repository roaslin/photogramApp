const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAuthRouter = require('../routes/auth');
const createUserRepository = require('../repositories/usersRepository');
const createTokensRepository = require('../repositories/tokensRepository');

const createApp = (db, { tokensRepo }) => {
  const usersRepository = createUserRepository(db);
  const tokensRepository = tokensRepo ?? createTokensRepository(db);
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routes
  app.use(createAuthRouter(usersRepository, tokensRepository));

  return app;
};

module.exports = createApp;
