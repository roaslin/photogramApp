const findPostsFromFollowingUsers = async (fun, username) => {
  return await fun(username);
};

module.exports = { postFromFollowingUsers: findPostsFromFollowingUsers };
