import mongoose from 'mongoose';
import * as common from '../common.test';

const app = common.server;
const chai = common.chai;
const should = common.should;
const User = common.user;

// new user info for testing
const newUser = {
  username: 'newUser123',
  email: 'newUserEmail@gmail.com',
  password: 'newUserPassword123',
};

describe('User Registration', () => {
  let requester: any = null;

  beforeEach(async () => {
    // start server before each test
    requester = await chai.request(app).keepOpen();
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
});
