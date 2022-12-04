const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const createUser = require('../domain/user');
const authRouter = express.Router();

const createAuthRouter = (userRepository, tokensRepository) => {
  authRouter.use(bodyParser.json());
  authRouter.use(bodyParser.urlencoded({ extended: false }));

  authRouter.post('/login', async (req, res, next) => {
    const result = await userRepository.findOneUser(req.body.email);

    if (result.rows.length === 1) {
      if (result.rows[0].password === req.body.password) {
        const token = crypto.randomUUID();
        try {
          const userId = result.rows[0].id;
          const tokenResult = await tokensRepository.save({
            userId: userId,
            token: token,
          });

          if (!tokenResult && tokenResult.rows.length !== 1) {
            res.status(400);
            res.send({ message: "Couldn't login, try again" });
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ token: token }));
          return;
        } catch (err) {
          console.log(err);
          res.status(400);
          res.send({ message: "Couldn't login, try again" });
        }
      }
      res.status(400);
      res.send({ message: 'Password incorrect' });
    } else {
      res.status(400);
      res.send({ message: 'User does not exist' });
    }
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

    await userRepository.saveUser(newUser);
    res.status(201);
    res.send();
  });

  return authRouter;
};

module.exports = createAuthRouter;
