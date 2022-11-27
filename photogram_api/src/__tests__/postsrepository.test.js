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

    await client.query('DELETE FROM users WHERE true');
  });

  afterAll(async () => {
    await client.query('DELETE FROM hashtags WHERE true');
    await pool.end();
  });

  test('return empty posts when user is not following anyone', async () => {
    await client.query('INSERT INTO users (username,email) VALUES ($1,$2)', [
      'nofriends',
      'nofriends@test.com',
    ]);

    const result =
      await client.query(`SELECT u2.id,u2.username, p.url, p.caption, p.lat, p.lng, p.created_at
                            FROM users u
                          INNER JOIN followers f ON u.id = f.leader_id
                          INNER JOIN users u2 ON f.follower_id  = u2.id
                          INNER JOIN posts p ON u2.id = p.user_id 
                          WHERE u.id =1
                          ORDER BY p.created_at DESC
                          LIMIT 10`);

    expect(result).not.toBeNull();
    expect(result.rows.length).toEqual(0);
  });

  test("return friend's posts when user is following friends", async () => {
    await client.query(
      'INSERT INTO users (id, username,email) VALUES ($1,$2,$3)',
      [1, 'ihaveOnefriend', 'ihaveonefriend@test.com']
    );

    await client.query(
      'INSERT INTO users (id,username,email) VALUES ($1,$2,$3)',
      [2, 'iamafriend', 'iamafriend@test.com']
    );

    await client.query(
      'INSERT INTO followers (leader_id,follower_id) VALUES ($1,$2)',
      [2, 1]
    );

    await client.query(
      'INSERT INTO posts (url, caption, lat, lng, user_id) VALUES ($1,$2,$3,$4,$5)',
      [
        'http://iamafriend.com/picture',
        'Awesome pic of my nice furniture',
        43.3,
        45.6,
        2,
      ]
    );

    const result = await client.query(
      `SELECT p.*
        FROM users u
      INNER JOIN followers f ON u.id = f.follower_id
      INNER JOIN posts p ON f.leader_id  = p.user_id  
      WHERE u.id = 1
      ORDER BY p.created_at DESC
      LIMIT 10`
    );

    expect(result.rows.length).toEqual(1);
  });
});
