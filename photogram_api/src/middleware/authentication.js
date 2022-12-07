const crypto = require('crypto');
const createTokensRepository = require('../repositories/tokensRepository');
const createUsersRepository = require('../repositories/usersRepository');

// TODO test this function
const createAuthenticator = (db) => {
  const tokensRepository = createTokensRepository(db);
  const usersRepository = createUsersRepository(db);

  return async (req, res, next) => {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      const err = new Error('Not authorized');
      err.status = 401;
      return next(err);
    }
    const token = bearer ? bearer.split(' ')[1].replaceAll('"', '') : null;
    const result = await tokensRepository.findUserIdByToken(token);

    if (result.rowCount === 0) {
      const err = new Error('Not authorized');
      err.status = 401;
      return next(err);
    }
    const userId = result.rows[0].user_id;
    const username = await usersRepository.findOne(userId);
    req.userId = userId;
    req.username = username;
    return next();
  };
};

module.exports = createAuthenticator;
