const express = require('express');
const authRouter = express.Router();
const { findOne } = require('../repositories/usersRepository');

const createAuthRouter = (db) => {
  const authenticate = async (email, password, callback) => {
    console.log('authenticate method');
    const result = await findOne(db, email, password);
    console.log(result);
    let token;
    if (result.rows.length == 1) {
      token = 'tokenway';
      console.log('authenticate create uuid');
      callback(null, token);
    } else {
      callback('No user found', null);
    }
  };

  authRouter.post('/login', (req, res, next) => {
    authenticate(req.body.email, req.body.password, (err, token) => {
      if (err) {
        return next(err);
      }
      if (token) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ token: token }));
      } else {
        res.send('Authentication failed check email/password');
      }
    });
  });

  authRouter.post('/signup', (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400);
      res.send({ message: 'Missing email or password' });
    }
  });

  return authRouter;
};

module.exports = createAuthRouter;
