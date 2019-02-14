import { default as Tweet } from '../../src/models/tweet';
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

  describe(' GET /api/tweets/all', () => {
    let getTweet: jest.Mock;
    const firstTweet = {
      message: 'This tweet is awesome #great @me',
      ownerId: '123',
      date: Date.now(),
      retweetId: null,
      hashtags: ['#great'],
      mentions: ['@me'],
      deleted: false,
    };

    const secondTweet = {
      message: 'Another cool #tweet @anyone',
      ownerId: '321',
      date: Date.now(),
      retweetId: null,
      hashtags: ['#tweet'],
      mentions: ['@anyone'],
      deleted: false,
    };

    beforeEach(() => {
      getTweet = jest.spyOn(Tweet, 'find').mockResolvedValue([firstTweet, secondTweet]);
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
          expect(res.body.tweets[0]).toEqual(firstTweet);
          expect(res.body.tweets[1]).toEqual(secondTweet);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });
});
