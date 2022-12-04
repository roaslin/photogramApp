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

  return {
    pool: pool,
    async query(text, params) {
      try {
        const res = await pool.query(text, params);
        return res;
      } catch (error) {
        console.log(error);
        return 'error';
      }
    },
  };
};

module.exports = createPostgresDb;
