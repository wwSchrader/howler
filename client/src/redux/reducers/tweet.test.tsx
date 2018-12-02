import * as Types from '../constants/ActionTypes';
import * as Tweet from './tweet';

describe('Tweet reducers', () => {
  describe('tweetArray', () => {
    it('should return initial state', () => {
      expect(Tweet.setTweetArray([], {})).toEqual([]);
    });

    it('should handle tweet array action', () => {
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

      const testAction = {
        tweets: testTweets,
        type: Types.TWEET_ARRAY,
      };

      expect(Tweet.setTweetArray([],testAction)).toEqual(testTweets);
    });
  });
});