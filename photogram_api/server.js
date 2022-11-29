const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createPostgresDb = require('./src/db/postgres');
const authRouter = require('./src/routes/auth');
const db = createPostgresDb('postgres', 5432);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(authRouter);

app.get('/', (req, res) => {
  res.send('Cacafuti!!');
});

module.exports = app;
