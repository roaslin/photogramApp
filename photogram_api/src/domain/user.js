const createUser = (username, bio, avatar, phone, email, password, caption) => {
  return { username, bio, avatar, phone, email, password, caption };
};

module.exports = createUser;
