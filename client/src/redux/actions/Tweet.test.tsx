import * as types from '../constants/ActionTypes';
import * as actions from './tweet';

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
});