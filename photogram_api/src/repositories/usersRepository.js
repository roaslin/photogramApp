const findOne = async (fun, email) => {
  return await fun(email);
};

const saveUser = async (fun, user) => {
  return await fun(user);
};

module.exports = { findOne, saveUser };
