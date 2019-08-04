import { default as Tweet } from '../../src/models/tweet';
import { default as User } from '../../src/models/user';
import * as componentPassport from '../../src/component-passport';
import { default as requester } from 'supertest';

const apiBaseRoute = '/api/tweets/';

let app: any;
let ensureAuthenticated: jest.Mock;

describe('Tweet Route', () => {

  beforeAll(async () => {
    ensureAuthenticated = jest
    .spyOn(componentPassport, 'ensureAuthenticated')
    .mockImplementation((req, res, next) => {
      console.log('Fake!');
      req.user = { _id: '123' };
      next();
    });

    app = await require('../../src/server');
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(() => {
    ensureAuthenticated.mockRestore();
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: jest.Mock;

    beforeEach(() => {
      createTweet = jest.spyOn(Tweet, 'create').mockImplementation(() => Promise.resolve(null),
      );
    });

    afterEach(() => {
      createTweet.mockRestore();
    });

    it('should add Tweet with no error', (done) => {
      const tweetMessage = { tweetMessage: 'This is a new tweet. I like #howling @someone' };

      requester(app)
        .put(`${apiBaseRoute}add`)
        .send(tweetMessage)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.statusCode).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('tweetPosted');
          expect(typeof res.body.tweetPosted).toBe('boolean');
          expect(res.body.tweetPosted).toBe(true);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: jest.Mock;

    beforeEach(() => {
      createTweet = jest.spyOn(Tweet, 'create').mockImplementation(() =>
        Promise.reject(
          {
            errors: {
              message: 'Text in message is required!',
            },
          },
        ),
      );
    });

    afterEach(() => {
      createTweet.mockRestore();
    });

    it('should throw error due to no message', (done) => {
      const tweetMessage = { tweetMessage: '' };
      requester(app)
        .put(`${apiBaseRoute}add`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(tweetMessage)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.statusCode).toBe(500);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Text in message is required!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: jest.Mock;

    beforeEach(() => {
      createTweet = jest.spyOn(Tweet, 'create').mockImplementation(() =>
        Promise.reject({
          errors: {
            message: 'Text in message exceeds 150 characters',
          },
        }),
      );
    });

    afterEach(() => {
      createTweet.mockRestore();
    });

    it('should throw error due to message exceeding 150 characters', (done) => {
      const tweetMessage = { tweetMessage: `6Y4uLtQQ7FQe6zJFjy3qpwVg1s573WBtW37I
      7n9MJMgoLDO9TCP15HQo3eAKaZXcNG47YUP5542OVh6KyxruxMC9n7lz3H80dyiREF664jkUU0
      6MhnFhOBx3rsFx06qX4c867kZoAP167T4kEahnp34`};
      requester(app)
        .put(`${apiBaseRoute}add`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(tweetMessage)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.statusCode).toBe(500);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Text in message exceeds 150 characters');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: jest.Mock;

    beforeEach(() => {
      createTweet = jest.spyOn(Tweet, 'create').mockImplementation(() =>
        Promise.reject({
          errors: {
            message: 'Matching tweet to retweetId is not found',
          },
        }),
      );
    });

    afterEach(() => {
      createTweet.mockRestore();
    });

    it('should throw error due to retweetId not being found', (done) => {
      const tweetMessage = { tweetMessage: 'Just a valid tweet', retweetId: 'invalidTweetId' };
      requester(app)
        .put(`${apiBaseRoute}add`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(tweetMessage)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.statusCode).toBe(500);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Matching tweet to retweetId is not found');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: jest.Mock;

    beforeEach(() => {
      createTweet = jest.spyOn(Tweet, 'create').mockImplementation(() =>
        Promise.reject({
          errors: {
            message: 'Matching tweet to replyId is not found',
          },
        }),
      );
    });

    afterEach(() => {
      createTweet.mockRestore();
    });

    it('should throw error due to replyId not being found', (done) => {
      const tweetMessage = { tweetMessage: 'Just a valid tweet', replyId: 'invalidTweetId' };
      requester(app)
        .put(`${apiBaseRoute}add`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(tweetMessage)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.statusCode).toBe(500);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('reason');
          expect(typeof res.body.reason).toBe('string');
          expect(res.body.reason).toBe('Matching tweet to replyId is not found');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' GET /api/tweets/all', () => {
    let getTweet: jest.Mock;
    let findUser: jest.Mock;
    const firstTweet = {
      _id: '99999999',
      message: 'This tweet is awesome #great @me',
      ownerId: '123',
      date: Date.now(),
      replyId: null,
      retweetId: null,
      hashtags: ['#great'],
      mentions: ['@me'],
      deleted: false,
    };

    const secondTweet = {
      _id: '8888888',
      message: 'Another cool #tweet @anyone',
      ownerId: '321',
      date: Date.now(),
      replyId: null,
      retweetId: null,
      hashtags: ['#tweet'],
      mentions: ['@anyone'],
      deleted: false,
    };

    const thirdTweet = {
      _id: '777777',
      message: 'This is a retweet',
      ownerId: 'abc123',
      date: Date.now(),
      replyId: null,
      retweetId: '99999999',
      hashtags: [],
      mentions: [],
      deleted: false,
    };

    const usernameObj = {
      ownerId: '123',
      username: 'Warren Awesomeness',
    };

    const usernameObj2 = {
      ownerId: '321',
      username: 'Allen Almighty',
    };

    const usernameObj3 = {
      ownerId: 'abc123',
      username: 'Carol Canouga',
    };

    const finalFirstTweet = {
      ...firstTweet,
      ...usernameObj,
    };

    const finalSecondTweet = {
      ...secondTweet,
      ...usernameObj2,
    };

    const finalThirdTweet = {
      ...thirdTweet,
      ...usernameObj3,
      retweet: firstTweet,
    };

    beforeEach(() => {
      const findResult: any = jest.fn((query) => {
        return {lean: jest.fn(() => {
          if ('replyId' in query && query.replyId === null) {
            console.log('return all tweets');
            return Promise.resolve([firstTweet, secondTweet, thirdTweet]);
          }
          if ('_id' in query && query._id === firstTweet._id) {
            console.log('return the first tweet only');
            return Promise.resolve([firstTweet]);
          }
          if ('_id' in query && query._id === secondTweet._id) {
            console.log('return the first tweet only');
            return Promise.resolve([secondTweet]);
          }
          if ('_id' in query && query._id === thirdTweet._id) {
            console.log('return the first tweet only');
            return Promise.resolve([thirdTweet]);
          }
          console.log('mock reject');
          return Promise.reject(query);
        })};
      });

      const sortResult: any = jest.fn((query) => {
        return { sort: jest.fn(() => findResult(query)) };
      });

      getTweet = jest.spyOn(Tweet, 'find')
        .mockImplementation((query: any) => sortResult(query));

      const findByIdResult = jest.fn((query) => {
        return { lean: jest.fn(() => {
          if (query === '123') {
            return (usernameObj);
          }
          if (query === '321') {
            return (usernameObj2);
          }
          if (query === 'abc123') {
            return (usernameObj3);
          }
          return Promise.reject();
        })};
      });
      findUser = jest.spyOn(User, 'findById')
        .mockImplementation((query: any) => findByIdResult(query));
    });

    afterEach(() => {
      getTweet.mockRestore();
    });

    it('get all tweets without error', (done) => {
      requester(app)
        .get(`${apiBaseRoute}all`)
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.statusCode).toBe(200);
          expect(res).toHaveProperty('body');
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('tweets');
          expect(typeof res.body.tweets).toBe('object');
          expect(res.body.tweets[0]).toEqual(finalFirstTweet);
          expect(res.body.tweets[1]).toEqual(finalSecondTweet);
          expect(res.body.tweets[2]).toEqual(finalThirdTweet);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });
});
