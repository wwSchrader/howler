import mongoose from 'mongoose';
import * as common from '../common.test';
import bcrypt from 'bcrypt';

const app = common.server;
const chai = common.chai;
const should = common.should;
const User = common.user;
const saltRounds = 10;

// new user info for testing
const newUser = {
  username: 'newUser123',
  email: 'newUserEmail@gmail.com',
  password: 'newUserPassword123',
};

// existing user info
const existingUser = {
  username: 'existingUser987',
  email: 'existingUserEmail@yahoo.com',
  authentication: {
    local: {
      password: 'existingUserPassword546',
    },
  },
};

describe('User Registration', () => {
  let requester: any = null;

  beforeEach((done) => {
    // start server before each test
    bcrypt.hash(existingUser.authentication.local.password, saltRounds)
      .then((hashedPassword) => {
        const existUser = new User({
          username: existingUser.username,
          email: existingUser.email,
          authentication: {
            local: {
              password: hashedPassword,
            },
          },
        });
        return existUser.save();
      })
      .then(() => {
        return requester = chai.request(app).keepOpen();
      })
      .then(() => done());
  });

  afterEach(async () => {
    // close database and server after each test
    await mongoose.connection.db.dropDatabase();
    await requester.close();
  });

  it('register a user normally', (done) => {
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

  it('register with no password', (done) => {
    requester
      .put('/api/users/register')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: newUser.username,
        email: newUser.email,
        password: '',
      })
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
        res.body.reason.should.equal('Need a password');
        done();
      })
      .catch((err: any) => done(err));
  });

  it('register with no username', (done) => {
    requester
      .put('/api/users/register')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: null,
        email: newUser.email,
        password: newUser.password,
      })
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
      .catch((err: any) => done(err));
  });

  it('register with no email', (done) => {
    requester
      .put('/api/users/register')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: newUser.username,
        email: null,
        password: newUser.password,
      })
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
      .catch((err: any) => done(err));
  });

  it('attempt to register with existing username', (done) => {
    requester
      .put('/api/users/register')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.authentication.local.password,
      })
      .then((res: any) => {
        should.exist(res);
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');
        res.body.should.have.property('registrationStatus');
        res.body.registrationStatus.should.be.a('boolean');
        res.body.should.have.property('reason');
        res.body.reason.should.be.a('string');
        res.body.reason.should.equal('Username already taken!');
        done();
      })
      .catch((err: any) => done(err));
  });

  it('login user', (done) => {
    requester
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: existingUser.username,
        password: existingUser.authentication.local.password,
      })
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
      .catch((err: any) => done(err));
  });

  it('attemp login user with wrong password', (done) => {
    requester
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: existingUser.username,
        password: 'wrongpassword',
      })
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
        res.body.authMessage.should.equal('Incorrect password!');
        done();
      })
      .catch((err: any) => done(err));
  });

  it('attemp login user with wrong username', (done) => {
    requester
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'wrongUsername',
        password: 'wrongpassword',
      })
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
      .catch((err: any) => done(err));
  });

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
