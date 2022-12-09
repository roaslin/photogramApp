const supertest = require('supertest');
const createPostgresDb = require('../../db/postgres');
const createApp = require('../../setup/compositionroot');
const createTokensRepository = require('../../repositories/tokensRepository');

describe('Auth endpoints', function () {
  let db;
  let app;
  let appRequest;
  let tokensRepository;

  beforeAll(async () => {
    db = createPostgresDb('localhost', 5433);
  });

  beforeEach(async () => {
    tokensRepository = createTokensRepository(db);
    app = createApp(db, tokensRepository);
    appRequest = supertest(app);
  });

  afterEach(async () => {
    await db.query('DELETE FROM users;');
    await db.query('DELETE FROM posts;');
  });

  afterAll(async () => {
    await db.pool.end();
  });

  describe('Sign up should', () => {
    test('return error message when email/username/password is not populated', async () => {
      const expectedBody = { message: 'Missing email or password' };

      const response = await appRequest
        .post('/signup')
        .send({ username: 'test', email: 'test@test.com', password: null });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedBody);
    });

    test('return 201 http status when user has signed up', async () => {
      const response = await appRequest.post('/signup').send({
        username: 'test3',
        email: 'test3@test.com',
        password: '12345',
      });

      expect(response.status).toEqual(201);
    });

    describe('Login should', () => {
      test('return user does not exist when email does not exist', async () => {
        const expectedBody = { message: 'User does not exist' };

        const response = await appRequest.post('/login').send({
          username: 'test3',
          email: 'test3@test.com',
          password: '12345',
        });

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedBody);
      });

      test('return password is incorrect when user entered a wrong password', async () => {
        const expectedBody = { message: 'Password incorrect' };

        await appRequest.post('/signup').send({
          username: 'test3',
          email: 'test3@test.com',
          password: '12345',
        });

        const response = await appRequest.post('/login').send({
          username: 'test3',
          email: 'test3@test.com',
          password: '54321',
        });

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedBody);
      });

      test('return token when user signs up successfully', async () => {
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

        expect(response.status).toEqual(200);
        expect(response.body.token).not.toBeNull();
      });

      test('return not authorized when user has not auth token', async () => {
        const response = await appRequest.get('/home');
    
        expect(response.status).toEqual(401);
      });
    });
  });
});
