const { Pool } = require('pg');

// TODO get config from environment
const pool = new Pool({
  host: 'postgres',
  database: 'postgres',
  user: 'postgres',
  password: 'example',
  port: 5432,
});

const db = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = db;
