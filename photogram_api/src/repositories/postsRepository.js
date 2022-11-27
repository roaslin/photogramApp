const postsFromFollowingUsers = async (client) => {
  return await client.query(
    `SELECT p.*
      FROM users u
    INNER JOIN followers f ON u.id = f.follower_id
    INNER JOIN posts p ON f.leader_id  = p.user_id  
    WHERE u.id = 1
    ORDER BY p.created_at DESC
    LIMIT 10`
  );
};

module.exports = { postFromFollowingUsers: postsFromFollowingUsers };
