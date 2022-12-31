const supertest = require('supertest');
const createPostgresDb = require('../../db/postgres');
const createApp = require('../../setup/compositionroot');

describe('All user requests should', () => {
  let db;
  let app;
  let appRequest;

  beforeAll(async () => {
    db = createPostgresDb('localhost', 5433);
    app = createApp(db);
    appRequest = supertest(app);
  });

  beforeEach(async () => {});

  afterEach(async () => {});

  afterAll(async () => {
    // await db.query('DELETE FROM users;');
    await db.pool.end();
  });

  test('return empty posts from users the current user is following', async () => {
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

  test('return posts from users the current user is following', async () => {
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

    await appRequest
      .post('/posts')
      .send({
        url: 'http://myawesome.pic.com',
        caption: 'This is a caption',
        lat: 45.2,
        lng: 65.5,
      })
      .set('Authorization', `Bearer ${loginReponse.body.token}`);

    const response = await appRequest
      .get('/home')
      .set('Authorization', `Bearer ${loginReponse.body.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.posts).toEqual([]);
  });
});
