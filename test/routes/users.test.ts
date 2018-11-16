import sinon, { SinonStub } from 'sinon';
import { passport } from '../../src/component-passport';
import { default as User } from '../../src/models/user';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

let app;

chai.use(chaiHttp);

describe('User Registration', () => {
  let requester: any = null;
  let authenticate: SinonStub;

  before(async () => {
    app = require('../../src/server');
    requester = await chai.request(app).keepOpen();
  });

  beforeEach(() => {
    authenticate = sinon.stub(passport, 'authenticate').returns(() => undefined);
  });

  after(() => {
    requester.close();
  });

  afterEach(() => {
    authenticate.restore();
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: SinonStub;
    let createUser: SinonStub;

    beforeEach(() => {
      findOneQuery = sinon.stub(User, 'findOne').resolves(null);
      createUser = sinon.stub(User, 'create').resolves(null);
    });

    afterEach(() => {
      findOneQuery.restore();
      createUser.restore();
    });

    it('register a user normally', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('registrationStatus');
          res.body.registrationStatus.should.be.a('boolean');
          res.body.registrationStatus.should.equal(true);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: SinonStub;

    beforeEach(() => {
      findOneQuery = sinon.stub(User, 'findOne').resolves(null);
    });

    afterEach(() => {
      findOneQuery.restore();
    });

    it('register with no password', (done) => {
      const newUser = {
        username: 'newUser',
        password: '',
        email: 'newUser42@gmail.com',
      };
      requester
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('registrationStatus');
          res.body.registrationStatus.should.be.a('boolean');
          res.body.registrationStatus.should.equal(false);
          res.body.should.have.property('reason');
          res.body.reason.should.be.a('string');
          res.body.reason.should.equal('Need a password!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: SinonStub;
    let createUser: SinonStub;

    beforeEach(() => {
      findOneQuery = sinon.stub(User, 'findOne').resolves(null);
      createUser = sinon.stub(User, 'create').resolves(
        { name: 'ValidationError', errors: { email: { message: 'Username is required!' } } },
      );
    });

    afterEach(() => {
      findOneQuery.restore();
      createUser.restore();
    });

    it('register with no username', (done) => {
      const newUser = {
        username: '',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('registrationStatus');
          res.body.registrationStatus.should.be.a('boolean');
          res.body.registrationStatus.should.equal(false);
          res.body.should.have.property('reason');
          res.body.reason.should.be.a('string');
          res.body.reason.should.equal('Username is required!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: SinonStub;
    let createUser: SinonStub;

    beforeEach(() => {
      findOneQuery = sinon.stub(User, 'findOne').resolves(null);
      createUser = sinon.stub(User, 'create').resolves(
        { name: 'ValidationError', errors: { email: { message: 'Email is required!' } } },
      );
    });

    afterEach(() => {
      findOneQuery.restore();
      createUser.restore();
    });

    it('register with no email', (done) => {
      const newUser = {
        username: 'newUser42',
        password: 'password123',
        email: '',
      };
      requester
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('registrationStatus');
          res.body.registrationStatus.should.be.a('boolean');
          res.body.registrationStatus.should.equal(false);
          res.body.should.have.property('reason');
          res.body.reason.should.be.a('string');
          res.body.reason.should.equal('Email is required!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('PUT /api/users/register', () => {
    let findOneQuery: SinonStub;

    beforeEach(() => {
      findOneQuery = sinon.stub(User, 'findOne').resolves({ username: 'newUser' });
    });

    afterEach(() => {
      findOneQuery.restore();
    });

    it('should fail at registering with existing username', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester
        .put('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('registrationStatus');
          res.body.registrationStatus.should.be.a('boolean');
          res.body.registrationStatus.should.equal(false);
          res.body.should.have.property('reason');
          res.body.reason.should.be.a('string');
          res.body.reason.should.equal('Username already taken!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {

    beforeEach(() => {
      authenticate.yields(null, { id: 1 });
    });

    it('should login user', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester
        .post('/api/users/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('boolean');
          res.body.isLoggedIn.should.equal(true);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {

    beforeEach(() => {
      authenticate.yields(null, null, { authMessage: 'Incorrect Password!' });
    });

    it('should fail to login with wrong password', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester
        .post('/api/users/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(401);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('boolean');
          res.body.isLoggedIn.should.equal(false);
          res.body.should.have.property('authMessage');
          res.body.authMessage.should.be.a('string');
          res.body.authMessage.should.equal('Incorrect Password!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {

    beforeEach(() => {
      authenticate.yields(null, null, { authMessage: 'Username not found!' });
    });

    it('should fail to login with wrong username', (done) => {
      const newUser = {
        username: 'newUser',
        password: 'password123',
        email: 'newUser42@gmail.com',
      };
      requester
        .post('/api/users/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(401);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('boolean');
          res.body.isLoggedIn.should.equal(false);
          res.body.should.have.property('authMessage');
          res.body.authMessage.should.be.a('string');
          res.body.authMessage.should.equal('Username not found!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe('GET /api/users/login', () => {
    it('logout user', (done) => {
      requester
        .get('/api/users/logout')
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('boolean');
          res.body.isLoggedIn.should.equal(false);
          done();
        })
        .catch((err: any) => done(err));
    });
  });
});
