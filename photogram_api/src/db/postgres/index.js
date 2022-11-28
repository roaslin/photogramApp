const { Pool } = require('pg');

// FIXME get config from environment
const createPostgresDb = (host, port) => {
  const pool = new Pool({
    host: host,
    database: 'postgres',
    user: 'postgres',
    password: 'example',
    port: port,
  });

  const query = async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pool: pool,
    async query(text, params) {
      try {
        const res = await pool.query(text, params);
        return res;
      } catch (error) {
        console.log(error);
      }
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

module.exports = createPostgresDb;
