const supertest = require('supertest');
const createPostgresDb = require('../../db/postgres');
const { saveUser } = require('../../repositories/usersRepository');
const createApp = require('../../setup/compositionroot');
const db = createPostgresDb('localhost', 5433);
const app = createApp(db);
const appRequest = supertest(app);

describe('Auth endpoints', function () {
  afterAll(async () => {
    await db.pool.end();
  });

  describe('Sign up should', () => {
    test('return error message when email or password is not populated', async () => {
      const expectedBody = { message: 'Missing email or password' };

      const response = await appRequest
        .post('/signup')
        .send({ email: 'test@test.com' });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedBody);
    });

    test('return 201 http status when user has signed up', async () => {
      const response = await appRequest.post('/signup');

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
