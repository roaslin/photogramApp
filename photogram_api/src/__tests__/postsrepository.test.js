const createPostgresDb = require('../db/postgres');
const createPostsRepository = require('../repositories/postsRepository');

describe('PostsRepository should', () => {
  let db;
  let postsRepository;

  beforeAll(async () => {
    db = createPostgresDb('localhost', 5433);
  });

  beforeEach(async () => {
    postsRepository = createPostsRepository(db);
  });

  afterEach(async () => {
    await db.query('DELETE FROM followers;');
    await db.query('DELETE FROM users;');
    await db.query('DELETE FROM posts;');
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test('return empty posts when user is not following anyone', async () => {
    await db.query('INSERT INTO users (username,email) VALUES ($1,$2)', [
      'nofriends',
      'nofriends@test.com',
    ]);

    const result = await postsRepository.findPostsFromFollowingUsers(
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

    const result = await postsRepository.findPostsFromFollowingUsers(
      'ihaveOnefriend'
    );

    expect(result.rows.length).toEqual(1);
  });
});
