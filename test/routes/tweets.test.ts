import sinon, { SinonStub } from 'sinon';
import { default as Tweet } from '../../src/models/tweet';
import * as componentPassport from '../../src/component-passport';
import chai from 'chai';
import chaiHttp from 'chai-http';

const apiBaseRoute = '/api/tweets/';
const should = chai.should();

let app;

chai.use(chaiHttp);

describe('Tweet Route', () => {
  let requester: any;
  let authenticate: SinonStub;

  before(async () => {
    authenticate = sinon
    .stub(componentPassport, 'ensureAuthenticated')
    .callsFake((req, res, next) => {
      req.user = { _id: '123' };
      next();
    });

    app = require('../../src/server');
    requester = await chai.request(app).keepOpen();
  });

  after(() => {
    authenticate.restore();
    requester.close();
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: SinonStub;

    beforeEach(() => {
      createTweet = sinon.stub(Tweet, 'create').resolves(null);
    });

    afterEach(() => {
      createTweet.restore();
    });

    it('should add Tweet with no error', (done) => {
      const tweetMessage = { tweetMessage: 'This is a new tweet. I like #howling @someone' };
      requester
        .put(`${apiBaseRoute}add`)
        .send(tweetMessage)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('tweetPosted');
          res.body.tweetPosted.should.be.a('boolean');
          res.body.tweetPosted.should.equal(true);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: SinonStub;

    beforeEach(() => {
      createTweet = sinon.stub(Tweet, 'create').rejects({
        errors: {
          message: 'Text in message is required!',
        },
      });
    });

    afterEach(() => {
      createTweet.restore();
    });

    it('should throw error due to no message', (done) => {
      const tweetMessage = { tweetMessage: '' };
      requester
        .put(`${apiBaseRoute}add`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(tweetMessage)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(500);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('reason');
          res.body.reason.should.be.a('string');
          res.body.reason.should.equal('Text in message is required!');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' PUT /api/tweets/add', () => {
    let createTweet: SinonStub;

    beforeEach(() => {
      createTweet = sinon.stub(Tweet, 'create').rejects({
        errors: {
          message: 'Text in message exceeds 150 characters',
        },
      });
    });

    afterEach(() => {
      createTweet.restore();
    });

    it('should throw error due to message exceeding 150 characters', (done) => {
      const tweetMessage = { tweetMessage: `6Y4uLtQQ7FQe6zJFjy3qpwVg1s573WBtW37I
      7n9MJMgoLDO9TCP15HQo3eAKaZXcNG47YUP5542OVh6KyxruxMC9n7lz3H80dyiREF664jkUU0
      6MhnFhOBx3rsFx06qX4c867kZoAP167T4kEahnp34`};
      requester
        .put(`${apiBaseRoute}add`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(tweetMessage)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(500);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('reason');
          res.body.reason.should.be.a('string');
          res.body.reason.should.equal('Text in message exceeds 150 characters');
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  describe(' GET /api/tweets/all', () => {
    let getTweet: SinonStub;
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
      message: 'Antother cool #tweet @anyone',
      ownerId: '321',
      date: Date.now(),
      retweetId: null,
      hashtags: ['#tweet'],
      mentions: ['@anyone'],
      deleted: false,
    };

    beforeEach(() => {
      getTweet = sinon.stub(Tweet, 'find').resolves([firstTweet, secondTweet]);
    });

    afterEach(() => {
      getTweet.restore();
    });

    it('get all tweets without error', (done) => {
      requester
        .get(`${apiBaseRoute}all`)
        .then((res: any) => {
          should.exist(res);
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.be.an('object');
          res.body.should.have.property('tweets');
          res.body.tweets.should.be.an('array');
          res.body.tweets[0].should.eql(firstTweet);
          res.body.tweets[1].should.eql(secondTweet);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });
});
