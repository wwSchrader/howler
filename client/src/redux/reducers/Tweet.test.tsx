import * as Types from '../constants/ActionTypes';
import * as Tweet from './Tweet';

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

  describe('showAddTweetModal', () => {
    it('should return initial state', () => {
      expect(Tweet.showAddTweetModal(false, {})).toEqual(false);
    });

    it('should return true', () => {
      const testAction = {
        showAddTweetModal: true,
        type: Types.SHOW_ADD_TWEET_MODAL,
      }
      expect(Tweet.showAddTweetModal(false, testAction)).toEqual(true);
    });
  });

  describe('replyArray', () => {
    it('should return initial state', () => {
      expect(Tweet.setReplyTweetArray([], {})).toEqual([]);
    });

    it('should handle reply tweet array action', () => {
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

  describe('showReplyTweetModal', () => {
    it('should return initial state', () => {
      expect(Tweet.showReplyTweetModal(false, {})).toEqual(false);
    });

    it('should return true', () => {
      const testAction = {
        showReplyTweetModal: true,
        type: Types.SHOW_REPLY_TWEET_MODAL,
      }
      expect(Tweet.showReplyTweetModal(false, testAction)).toEqual(true);
    });
  });
});