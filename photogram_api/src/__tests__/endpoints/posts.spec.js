const supertest = require('supertest');
const createPostgresDb = require('../../db/postgres');
const createApp = require('../../setup/compositionroot');

describe('Posts endpoint should', () => {
  let db;
  let app;
  let appRequest;
  let token;

  beforeAll(async () => {
    db = createPostgresDb('localhost', 5433);
  });

  beforeEach(async () => {
    app = createApp(db);
    appRequest = supertest(app);

    await appRequest.post('/signup').send({
      username: 'test3',
      email: 'test3@test.com',
      password: '12345',
    });

    const response = await appRequest.post('/login').send({
      username: 'test3',
      email: 'test3@test.com',
      password: '12345',
    });
    token = response.body.token;
  });

  afterEach(async () => {
    await db.query('DELETE FROM users;');
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test('store a post', async () => {
    const response = await appRequest
      .post('/posts')
      .send({
        url: 'http://myawesome.pic.com',
        caption: 'This is a caption',
        lat: 45.2,
        lng: 65.5,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(201);
  });
});
