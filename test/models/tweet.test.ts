import { default as Tweet, ITweet } from '../../src/models/tweet';

describe('Tweet Model', () => {
  let findTweet: jest.Mock;

  beforeEach(() => {
    findTweet = jest.spyOn(Tweet, 'findById').mockImplementation(() => Promise.resolve(true));
  });

  afterEach(() => {
    findTweet.mockRestore();
  });

  describe('saving a tweet with valid inputs', () => {
    it('should save', (done) => {
      const newTweet: any = new Tweet({
        message: 'First tweet! #first1st #second2nd #third #3434 @me @you2',
        ownerId: 'warren',
      });

      newTweet.validate((err: Error) => {
        expect(err).toBeNull();
        expect(newTweet).toHaveProperty('message');
        expect(typeof newTweet.message).toBe('string');
        expect(newTweet.message).toBe('First tweet! #first1st #second2nd #third #3434 @me @you2');
        expect(newTweet).toHaveProperty('hashtags');
        expect(typeof newTweet.hashtags).toBe('object');
        expect(typeof newTweet.hashtags[0]).toBe('string');
        expect(newTweet.hashtags[0]).toBe('#first1st');
        expect(newTweet).toHaveProperty('mentions');
        expect(typeof newTweet.mentions).toBe('object');
        expect(typeof newTweet.mentions[0]).toBe('string');
        expect(newTweet.mentions[0]).toBe('@me');
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
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('ownerId');
        expect(typeof err.errors.ownerId).toBe('object');
        expect(err.errors.ownerId).toHaveProperty('message');
        expect(typeof err.errors.ownerId.message).toBe('string');
        expect(err.errors.ownerId.message).toBe('User id required!');
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
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('message');
        expect(typeof err.errors.message).toBe('object');
        expect(err.errors.message).toHaveProperty('message');
        expect(typeof err.errors.message.message).toBe('string');
        expect(err.errors.message.message).toBe('Text in message is required!');
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
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('message');
        expect(typeof err.errors.message).toBe('object');
        expect(err.errors.message).toHaveProperty('message');
        expect(typeof err.errors.message.message).toBe('string');
        expect(err.errors.message.message).toBe('Text in message exceeds 150 characters');
        done();
      });
    });
  });

  describe('saving a tweet with an invalid retweet id', () => {
    beforeEach(() => {
      findTweet = jest.spyOn(Tweet, 'findById').mockImplementation(() => Promise.resolve(false));
    });

    it('should throw an error that retweet id doesnt match in database', (done) => {
      const newInvalidTweet: ITweet = new Tweet({
        message: 'blah blah blah',
        ownerId: 'bob',
        retweetId: 'invalidTweetId123',
      });

      newInvalidTweet.validate((err: any) => {
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('retweetId');
        expect(typeof err.errors.retweetId).toBe('object');
        expect(err.errors.retweetId).toHaveProperty('message');
        expect(typeof err.errors.retweetId.message).toBe('string');
        expect(err.errors.retweetId.message).toBe('Matching tweet to retweetId is not found');
        done();
      });
    });
  });

  describe('saving a tweet with an valid retweet id', () => {
    beforeEach(() => {
      findTweet = jest.spyOn(Tweet, 'findById').mockImplementation(() => Promise.resolve(true));
    });

    it('should save successfuly', (done) => {
      const newTweet: ITweet = new Tweet({
        message: 'blah blah blah',
        ownerId: 'bob',
        retweetId: 'aRealTweetId',
      });

      newTweet.validate((err: any) => {
        expect(err).toBeNull();
        expect(newTweet).toHaveProperty('message');
        expect(typeof newTweet.message).toBe('string');
        expect(newTweet.message).toBe('blah blah blah');
        expect(newTweet).toHaveProperty('hashtags');
        expect(typeof newTweet.hashtags).toBe('object');
        expect(newTweet.hashtags).toBeNull();
        expect(newTweet).toHaveProperty('mentions');
        expect(typeof newTweet.mentions).toBe('object');
        expect(newTweet.mentions).toBeNull();
        done();
      });
    });
  });

  describe('saving a tweet with an invalid reply id', () => {
    beforeEach(() => {
      findTweet = jest.spyOn(Tweet, 'findById').mockImplementation(() => Promise.resolve(false));
    });

    it('should throw an error that reply id doesnt match in database', (done) => {
      const newInvalidTweet: ITweet = new Tweet({
        message: 'blah blah blah',
        ownerId: 'bob',
        replyId: 'invalidTweetId123',
      });

      newInvalidTweet.validate((err: any) => {
        expect(err).toBeDefined();
        expect(typeof err).toBe('object');
        expect(err).toHaveProperty('errors');
        expect(typeof err.errors).toBe('object');
        expect(err.errors).toHaveProperty('replyId');
        expect(typeof err.errors.replyId).toBe('object');
        expect(err.errors.replyId).toHaveProperty('message');
        expect(typeof err.errors.replyId.message).toBe('string');
        expect(err.errors.replyId.message).toBe('Matching tweet to replyId is not found');
        done();
      });
    });
  });

  describe('saving a tweet with an valid reply id', () => {
    beforeEach(() => {
      findTweet = jest.spyOn(Tweet, 'findById').mockImplementation(() => Promise.resolve(true));
    });

    it('should save successfuly', (done) => {
      const newTweet: ITweet = new Tweet({
        message: 'blah blah blah',
        ownerId: 'bob',
        retweetId: 'aRealTweetId',
      });

      newTweet.validate((err: any) => {
        expect(err).toBeNull();
        expect(newTweet).toHaveProperty('message');
        expect(typeof newTweet.message).toBe('string');
        expect(newTweet.message).toBe('blah blah blah');
        expect(newTweet).toHaveProperty('hashtags');
        expect(typeof newTweet.hashtags).toBe('object');
        expect(newTweet.hashtags).toBeNull();
        expect(newTweet).toHaveProperty('mentions');
        expect(typeof newTweet.mentions).toBe('object');
        expect(newTweet.mentions).toBeNull();
        done();
      });
    });
  });
});
