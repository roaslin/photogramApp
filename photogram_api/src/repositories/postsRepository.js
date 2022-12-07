const createPostsRepository = (db) => {
  const query = async (text, params) => {
    try {
      const res = await db.query(text, params);
      return res;
    } catch (error) {
      console.log(error);
      // return error to check in controller
      return 'error';
    }
  };

  return {
    async save(postCommand) {
      return await query(
        `INSERT INTO posts (url, caption, lat,lng, user_id) VALUES ($1,$2,$3,$4,$5)`,
        [
          postCommand.url,
          postCommand.caption,
          postCommand.lat,
          postCommand.lng,
          postCommand.userId,
        ]
      );
    },
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
