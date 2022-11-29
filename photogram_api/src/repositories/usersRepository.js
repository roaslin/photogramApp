const findOne = async (fun, username) => {
  return await fun(username);
};

const saveUser = async (fun, user) => {
  return await fun(user);
};

module.exports = { findOne, saveUser };
