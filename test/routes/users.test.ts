import * as componentPassport from '../../src/component-passport';
import { default as User } from '../../src/models/user';
import { default as requester } from 'supertest';
import passport from 'passport';

let app: any;
let loginUser: jest.Mock;
let authenticate: jest.Mock;

describe('User Route', () => {

  beforeAll(async () => {
    loginUser = jest
    .spyOn(componentPassport, 'loginUser')
    .mockImplementation((req, res, next) => {
      console.log('fake called!');
      res.json({ isLoggedIn: true });
    });

    app = await require('../../src/server');
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    loginUser.mockRestore();
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: jest.Mock;
    let createUser: jest.Mock;

    beforeEach(() => {
      findOneQuery = jest.spyOn(User, 'findOne').mockResolvedValue(null);
      createUser = jest.spyOn(User, 'create').mockResolvedValue(null);
    });

    afterEach(async () => {
      await findOneQuery.mockRestore();
      await createUser.mockRestore();
    });

    it('register a user normally', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('registrationStatus');
          expect(typeof res.body.registrationStatus).toBe('boolean');
          expect(res.body.registrationStatus).toBe(true);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: jest.Mock;

    beforeEach(() => {
      findOneQuery = jest.spyOn(User, 'findOne').mockResolvedValue(null);
    });

    afterEach(() => {
      findOneQuery.mockRestore();
    });

    it('register with no password', (done) => {
      const newUser = {
        username: 'newUser',
        password: '',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res).toBe('object');
          expect(res.body).toHaveProperty('registrationStatus');
          expect(typeof res.body.registrationStatus).toBe('boolean');
          expect(res.body.registrationStatus).toBe(false);
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Need a password!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: jest.Mock;
    let createUser: jest.Mock;

    beforeEach(() => {
      findOneQuery = jest.spyOn(User, 'findOne').mockResolvedValue(null);
      createUser = jest.spyOn(User, 'create').mockResolvedValue(
        { name: 'ValidationError', errors: { email: { message: 'Username is required!' } } },
      );
    });

    afterEach(() => {
      findOneQuery.mockRestore();
      createUser.mockRestore();
    });

    it('register with no username', (done) => {
      const newUser = {
        username: '',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('registrationStatus');
          expect(typeof res.body.registrationStatus).toBe('boolean');
          expect(res.body.registrationStatus).toBe(false);
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Username is required!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: jest.Mock;
    let createUser: jest.Mock;

    beforeEach(() => {
      findOneQuery = jest.spyOn(User, 'findOne').mockResolvedValue(null);
      createUser = jest.spyOn(User, 'create').mockResolvedValue(
        { name: 'ValidationError', errors: { email: { message: 'Email is required!' } } },
      );
    });

    afterEach(() => {
      findOneQuery.mockRestore();
      createUser.mockRestore();
    });

    it('register with no email', (done) => {
      const newUser = {
        username: 'newUser42',
        password: 'password123',
        email: '',
      };
      requester(app)
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('registrationStatus');
          expect(typeof res.body.registrationStatus).toBe('boolean');
          expect(res.body.registrationStatus).toBe(false);
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Email is required!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: jest.Mock;

    beforeEach(() => {
      findOneQuery = jest.spyOn(User, 'findOne').mockResolvedValue({ username: 'newUser' });
    });

    afterEach(() => {
      findOneQuery.mockRestore();
    });

    it('should fail at registering with existing username', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('registrationStatus');
          expect(typeof res.body.registrationStatus).toBe('boolean');
          expect(res.body.registrationStatus).toBe(false);
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Username already taken!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {

    beforeEach(() => {
      authenticate = jest.spyOn(componentPassport, 'authenticate')
      .mockImplementation((strategy, cb) => {
        cb(null, { id: 1 }, null);
      });
    });

    afterEach(() => {
      authenticate.mockRestore();
    });

    it('should login user', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('isLoggedIn');
          expect(typeof res.body.isLoggedIn).toBe('boolean');
          expect(res.body.isLoggedIn).toBe(true);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {

    beforeEach(() => {
      authenticate = jest.spyOn(componentPassport, 'authenticate')
      .mockImplementation((strategy, cb) => {
        cb(null, null, { authMessage: 'Incorrect Password!' });
      });
    });

    afterEach(() => {
      authenticate.mockRestore();
    });

    it('should fail to login with wrong password', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(401);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('isLoggedIn');
          expect(typeof res.body.isLoggedIn).toBe('boolean');
          expect(res.body.isLoggedIn).toBe(false);
          expect(res.body).toHaveProperty('authMessage');
          expect(typeof res.body.authMessage).toBe('string');
          expect(res.body.authMessage).toBe('Incorrect Password!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {

    beforeEach(() => {
      authenticate = jest.spyOn(componentPassport, 'authenticate')
      .mockImplementation((strategy, cb) => {
        cb(null, null, { authMessage: 'Username not found!' });
      });
    });

    it('should fail to login with wrong username', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester(app)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(newUser)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(401);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('isLoggedIn');
          expect(typeof res.body.isLoggedIn).toBe('boolean');
          expect(res.body.isLoggedIn).toBe(false);
          expect(res.body).toHaveProperty('authMessage');
          expect(typeof res.body.authMessage).toBe('string');
          expect(res.body.authMessage).toBe('Username not found!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('GET /api/users/logout', () => {
    it('logout user', (done) => {
      requester(app)
        .get('/api/users/logout')
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('isLoggedIn');
          expect(typeof res.body.isLoggedIn).toBe('boolean');
          expect(res.body.isLoggedIn).toBe(false);
          done();
        })
        .catch((err: any) => done(err));
    });
  });
});
