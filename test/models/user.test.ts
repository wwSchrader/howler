import { default as User } from '../../src/models/user';
import { type } from 'os';

describe('User Model', () => {
  describe('saving with username & email', () => {
    it('should save without errors', (done) => {
      const newUser = new User({
        username: 'newUsername987',
        email: 'newUserEmail@gmail.com',
      });

      newUser.validate((err) => {
        expect(err).toBeNull();
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
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('username');
        expect(typeof err.errors.username).toBe('object');
        expect(err.errors.username).toHaveProperty('message');
        expect(typeof err.errors.username.message).toBe('string');
        expect(err.errors.username.message).toBe('Username is required!');
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
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('email');
        expect(typeof err.errors.email).toBe('object');
        expect(err.errors.email).toHaveProperty('message');
        expect(typeof err.errors.email.message).toBe('string');
        expect(err.errors.email.message).toBe('Email is required!');
        done();
      });
    });
  });
});
