const createPostsRepository = (db) => {
  const query = async (text, params) => {
    try {
      const res = await db.query(text, params);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    async findPostsFromFollowingUsers(username) {
      return await query(
        `SELECT p.*
          FROM users u
        INNER JOIN followers f ON u.id = f.follower_id
        INNER JOIN posts p ON f.leader_id  = p.user_id  
        WHERE u.username = $1
        ORDER BY p.created_at DESC
        LIMIT 10`,
        [username]
      );
    },
  };
};

module.exports = createPostsRepository;
