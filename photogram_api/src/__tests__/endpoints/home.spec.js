const supertest = require('supertest');
const createPostgresDb = require('../../db/postgres');
const createApp = require('../../setup/compositionroot');

describe('All user requests should', () => {
  let db;
  let app;
  let appRequest;

  beforeAll(async () => {
    db = createPostgresDb('localhost', 5433);
  });

  beforeEach(async () => {
    app = createApp(db);
    appRequest = supertest(app);
  });

  afterEach(async () => {
    await db.query('DELETE FROM users;');
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test('return not authorized when user has not auth token', async () => {
    const response = await appRequest.get('/home');

    expect(response.status).toEqual(401);
  });

  test('return latest posts from users the current user is following when has auth token', async () => {
    await appRequest.post('/signup').send({
      username: 'test3',
      email: 'test3@test.com',
      password: '12345',
    });

    const loginReponse = await appRequest.post('/login').send({
      username: 'test3',
      email: 'test3@test.com',
      password: '12345',
    });

    const response = await appRequest
      .get('/home')
      .set('Authorization', `Bearer ${loginReponse.body.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.posts).toEqual([]);
  });
});
