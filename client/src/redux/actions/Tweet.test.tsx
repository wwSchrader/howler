import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as actions from './tweet';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tweet actions', () => {
  describe('tweet array', () => {
    it('should create an action to set the tweet array', () => {
      const testTweets = [
        {
          date: 2132015,
          deleted: false,
          hastags: ['#first'],
          mentions: [],
          message: 'A sample tweet! #first',
          ownerId: 'abc123',
          retweet: null,
          retweetId: null,
        }
      ];

      const expectedAction = {
        tweets: testTweets,
        type: types.TWEET_ARRAY,
      };

      expect(actions.setTweetArray(testTweets)).toEqual(expectedAction);
    });
  });

  describe('get all tweets api call', () => {
    afterEach(() => {
      fetchMock.restore()
    });

    it('should create set all tweets action', () => {
      const store = mockStore({});
      const testTweets = [
        {
          date: 2132015,
          deleted: false,
          hastags: ['#first'],
          mentions: [],
          message: 'A sample tweet! #first',
          ownerId: 'abc123',
          retweet: null,
          retweetId: null,
        },
        {
          date: 5165465165,
          deleted: false,
          hastags: ['#second'],
          mentions: [],
          message: 'A sample tweet! #second',
          ownerId: '5464jhfgd',
          retweet: null,
          retweetId: null,
        }
      ];

      const expectedActions = [{
        tweets: testTweets,
        type: types.TWEET_ARRAY,
      }];

      fetchMock.getOnce('/api/tweets/all', {tweets: testTweets});

      return store.dispatch<any>(actions.getAllTweetsApi())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});