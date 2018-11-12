import * as common from '../common.test';
import { default as User } from '../../src/models/user';

const should = common.should;

describe('User Model', () => {
  describe('saving with username & email', () => {
    it('should save without errors', (done) => {
      const newUser = new User({
        username: 'newUsername987',
        email: 'newUserEmail@gmail.com',
      });

      newUser.validate((err) => {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('saving without username', () => {
    it('should throw error', (done) => {
      const newUser = new User({
        username: '',
        email: 'newUserEmail@gmail.com',
      });

      newUser.validate((err) => {
        should.exist(err);
        err.should.have.property('errors');
        err.should.be.an('object');
        err.errors.should.have.property('username');
        err.errors.username.should.be.a('object');
        err.errors.username.should.have.property('message');
        err.errors.username.message.should.be.a('String');
        err.errors.username.message.should.equal('Username is required!');
        done();
      });
    });
  });

  describe('saving without password', () => {
    it('should throw error', (done) => {
      const newUser = new User({
        username: 'someusername123',
        email: '',
      });

      newUser.validate((err) => {
        should.exist(err);
        err.should.have.property('errors');
        err.should.be.an('object');
        err.errors.should.have.property('email');
        err.errors.email.should.be.a('object');
        err.errors.email.should.have.property('message');
        err.errors.email.message.should.be.a('String');
        err.errors.email.message.should.equal('Email is required!');
        done();
      });
    });
  });
});
