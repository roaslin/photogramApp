const { Pool } = require('pg');
const createPostgresDb = require('../db/postgres');
const { postFromFollowingUsers } = require('../repositories/postsRepository');

describe('PostsRepository should', () => {
  let db;

  beforeAll(async () => {
    db = createPostgresDb('localhost', 5433);

    await db.query('DELETE FROM users WHERE true');
  });

  afterAll(async () => {
    await db.query('DELETE FROM hashtags WHERE true');
    await db.pool.end();
  });

  test('return empty posts when user is not following anyone', async () => {
    await db.query('INSERT INTO users (username,email) VALUES ($1,$2)', [
      'nofriends',
      'nofriends@test.com',
    ]);

    const result = await postFromFollowingUsers(
      db.findPostsFromFollowingUsers,
      'nofriends'
    );

    expect(result).not.toBeNull();
    expect(result.rows.length).toEqual(0);
  });

  test("return friend's posts when user is following friends", async () => {
    await db.query('INSERT INTO users (id, username,email) VALUES ($1,$2,$3)', [
      1,
      'ihaveOnefriend',
      'ihaveonefriend@test.com',
    ]);

    await db.query('INSERT INTO users (id,username,email) VALUES ($1,$2,$3)', [
      2,
      'iamafriend',
      'iamafriend@test.com',
    ]);

    await db.query(
      'INSERT INTO followers (leader_id,follower_id) VALUES ($1,$2)',
      [2, 1]
    );

    await db.query(
      'INSERT INTO posts (url, caption, lat, lng, user_id) VALUES ($1,$2,$3,$4,$5)',
      [
        'http://iamafriend.com/picture',
        'Awesome pic of my nice furniture',
        43.3,
        45.6,
        2,
      ]
    );

    const result = await postFromFollowingUsers(
      db.findPostsFromFollowingUsers,
      'ihaveOnefriend'
    );

    expect(result.rows.length).toEqual(1);
  });
});
