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
    await db.query('DELETE FROM posts;');
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test('return not authorized when user has not auth token', async () => {
    const response = await appRequest.get('/home');

    expect(response.status).toEqual(401);
  });
});
