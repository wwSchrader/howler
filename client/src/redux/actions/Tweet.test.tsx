import fetchMock from 'fetch-mock';
import configureMockStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as actions from './Tweet';

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
          username: 'JoeAwesomeness',
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
          username: 'JoeAwesomeness',
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
          username: 'CaralCoolness',
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

  describe('setShowAddTweetModal action', () => {
    const expectedAction = {
      showAddTweetModal: true,
      type: types.SHOW_ADD_TWEET_MODAL,
    };

    expect(actions.setShowAddTweetModal(true)).toEqual(expectedAction);
  });

  describe('setShowReplyTweetModal action', () => {
    const expectedAction = {
      showReplyTweetModal: true,
      type: types.SHOW_REPLY_TWEET_MODAL,
    };

    expect(actions.setShowReplyTweetModal(true)).toEqual(expectedAction);
  });

  describe('addTweetApi thunk action', () => {
    let store: MockStore;
    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('should handle successful tweet add', () => {
      const testTweet = 'this is a test tweet #great @everyone';

      const expectedActions = [{
        showAddTweetModal: false,
        type: types.SHOW_ADD_TWEET_MODAL,
      }];

      fetchMock.putOnce('/api/tweets/add', {tweetPosted: true});

      return store.dispatch<any>(actions.addTweetApi(testTweet, null))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});