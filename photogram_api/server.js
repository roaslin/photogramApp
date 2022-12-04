const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createPostgresDb = require('./src/db/postgres');
const createAuthRouter = require('./src/routes/auth');
const createUserRepository = require('./src/repositories/usersRepository');
const createTokensRepository = require('./src/repositories/tokensRepository');
const db = createPostgresDb('postgres', 5432);
const usersRepository = createUserRepository(db);
const tokensRepository = createTokensRepository(db);
const authRouter = createAuthRouter(usersRepository, tokensRepository);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/cacafuti', (req, res) => {
  res.send('Cacafuti!!');
});

app.use(authRouter);

// TODO Add authentication middleware

module.exports = app;
