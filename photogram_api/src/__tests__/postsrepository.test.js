const { Pool } = require('pg');

describe('PostsRepository should', () => {
  let pool;
  let client;
  beforeAll(async () => {
    pool = new Pool({
      host: 'localhost',
      database: 'postgres',
      user: 'postgres',
      password: 'example',
      port: 5433,
    });

    client = {
      async query(text, params) {
        try {
          const res = await pool.query(text, params);
          return res;
        } catch (error) {
          console.log(error);
        }
      },
    };

    await client.query('DELETE FROM hashtags WHERE true');
  });

  afterAll(async () => {
    await client.query('DELETE FROM hashtags WHERE true');
    await pool.end();
  });

  test('return empty posts when user is not following anyone', async () => {
    await client.query('INSERT INTO hashtags (title) VALUES ($1)', ['tutti']);

    const result = await client.query('SELECT * FROM hashtags');

    expect(result.rows[0].title).toEqual('tutti');
  });
});
