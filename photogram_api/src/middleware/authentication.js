const crypto = require('crypto');
const { findOne } = require('../repositories/usersRepository');

const authenticate = async (email, password, callback) => {
  const result = await userRepository.findOneUser(email);
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

module.exports = { authenticate };
