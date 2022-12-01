const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const createUser = require('../domain/user');
const { findOne, saveUser } = require('../repositories/usersRepository');

const authRouter = express.Router();

const createAuthRouter = (db) => {
  const authenticate = async (email, password, callback) => {
    const result = await findOne(db.findOneUser, email);
    if (result.rows.length == 1) {
      if (result.rows[0].password === password) {
        const token = crypto.randomUUID();
        callback(null, token);
        return;
      }
      callback('Password incorrect');
    } else {
      callback('User does not exist', null);
    }
  };

  authRouter.use(bodyParser.json());
  authRouter.use(bodyParser.urlencoded({ extended: false }));

  authRouter.post('/login', (req, res, next) => {
    authenticate(req.body.email, req.body.password, (err, token) => {
      if (err) {
        res.status(400);
        res.send({ message: err });
        return;
      }
      if (token) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ token: token }));
      } else {
        res.send('Authentication failed check email/password');
      }
    });
  });

  authRouter.post('/signup', async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(400);
      res.send({ message: 'Missing email or password' });
      return;
    }
    const newUser = createUser(
      req.body.username,
      req.body.bio,
      req.body.avatar,
      req.body.phone,
      req.body.email,
      req.body.password,
      req.body.caption
    );

    await saveUser(db.saveUser, newUser);
    res.status(201);
    res.send();
  });

  return authRouter;
};

module.exports = createAuthRouter;
