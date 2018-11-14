import * as common from '../common.test';
import { default as Tweet, ITweet } from '../../src/models/tweet';

const should = common.should;

describe('Tweet Model', () => {
  describe('saving a tweet with valid inputs', () => {
    it('should save', (done) => {
      const newTweet: any = new Tweet({
        message: 'First tweet! #first1st #second2nd #third #3434 @me @you2',
        ownerId: 'warren',
      });

      newTweet.validate((err: Error) => {
        should.not.exist(err);
        newTweet.should.have.property('hashtags');
        newTweet.hashtags.should.be.an('array');
        newTweet.hashtags[0].should.be.a('string');
        newTweet.hashtags[0].should.equal('#first1st');
        newTweet.should.have.property('mentions');
        newTweet.mentions.should.be.an('array');
        newTweet.mentions[0].should.be.a('string');
        newTweet.mentions[0].should.equal('@me');
        done();
      });
    });
  });

  describe('saving a tweet with no user id', () => {
    it('should throw an error that user id is missing', (done) => {
      const newTweet: any = new Tweet({
        message: 'First tweet! #first1st #second2nd #third #3434 @me @you2',
        ownerId: '',
      });

      newTweet.validate((err: any) => {
        should.exist(err);
        err.should.be.an('object');
        err.should.have.property('errors');
        err.errors.should.be.an('object');
        err.errors.should.have.property('ownerId');
        err.errors.ownerId.should.be.an('object');
        err.errors.ownerId.should.have.property('message');
        err.errors.ownerId.message.should.be.a('string');
        err.errors.ownerId.message.should.equal('User id required!');
        done();
      });
    });
  });

  describe('saving a tweet with no text in message', () => {
    it('should throw an error that text in message is missing', (done) => {
      const newTweet: any = new Tweet({
        message: '',
        ownerId: 'bob',
      });

      newTweet.validate((err: any) => {
        should.exist(err);
        err.should.be.an('object');
        err.should.have.property('errors');
        err.errors.should.be.an('object');
        err.errors.should.have.property('message');
        err.errors.message.should.be.an('object');
        err.errors.message.should.have.property('message');
        err.errors.message.message.should.be.a('string');
        err.errors.message.message.should.equal('Text in message is required!');
        done();
      });
    });
  });

  describe('saving a tweet with text exceeding 150 characters in message', () => {
    it('should throw an error that text in message is too long', (done) => {
      // message is a random string 151 characters long
      const tweetMessageTooLong = '6Y4uLtQQ7FQe6zJFjy3qpwVg1s573WBtW37I7n9MJMgoLDO9TCP15HQo3eA' +
      'KaZXcNG47YUP5542OVh6KyxruxMC9n7lz3H80dyiREF664jkUU06MhnFhOBx3rsFx06qX4c867kZoAP167T4kEahnp' +
      '34';

      const newTweet: any = new Tweet({
        message: tweetMessageTooLong,
        ownerId: 'bob',
      });

      newTweet.validate((err: any) => {
        should.exist(err);
        err.should.be.an('object');
        err.should.have.property('errors');
        err.errors.should.be.an('object');
        err.errors.should.have.property('message');
        err.errors.message.should.be.an('object');
        err.errors.message.should.have.property('message');
        err.errors.message.message.should.be.a('string');
        err.errors.message.message.should.equal('Text in message exceeds 150 characters');
        done();
      });
    });
  });
});
