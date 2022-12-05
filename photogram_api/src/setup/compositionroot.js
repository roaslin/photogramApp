const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAuthRouter = require('../routes/auth');
const createUserRepository = require('../repositories/usersRepository');
const createTokensRepository = require('../repositories/tokensRepository');
const createHomeRouter = require('../routes/home');

const createApp = (database, tokensRepo) => {
  const db = database ?? zcreatePostgresDb('postgres', 5432);
  const usersRepository = createUserRepository(db);
  const tokensRepository = tokensRepo ?? createTokensRepository(db);
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routes
  app.use(createAuthRouter(usersRepository, tokensRepository));
  app.use(createHomeRouter());

  return app;
};

module.exports = createApp;
