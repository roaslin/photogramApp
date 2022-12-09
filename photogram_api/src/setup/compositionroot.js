const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createAuthRouter = require('../routes/auth');
const createUserRepository = require('../repositories/usersRepository');
const createTokensRepository = require('../repositories/tokensRepository');
const createHomeRouter = require('../routes/home');
const createAuthenticator = require('../middleware/authentication');
const createPostsRepository = require('../repositories/postsRepository');
const createPostsRouter = require('../routes/posts');

const createApp = (database, tokensRepo, postsRepo) => {
  const db = database ?? createPostgresDb('postgres', 5432);
  const usersRepository = createUserRepository(db);
  const tokensRepository = tokensRepo ?? createTokensRepository(db);
  const postsRepository = postsRepo ?? createPostsRepository(db);
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routes
  app.use(createAuthRouter(usersRepository, tokensRepository));
  // Authenticated requests
  app.use(createAuthenticator(db));
  app.use(createHomeRouter(postsRepository));
  app.use(createPostsRouter(postsRepository));

  return app;
};

module.exports = createApp;
