const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Cacafuti!!');
});

app.get('/posts/following', async (req, res) => {
  const result = await db.query('SELECT username FROM users', []);

  res.send(`Following my ass! ${result.rows[0].username}`);
});

app.listen(8000, () => {
  console.log('Listening on port 8000!!');
});
