import * as Types from '../constants/ActionTypes';

export function setTweetArray(tweetArray: any) {
  return {
    tweets: tweetArray,
    type: Types.TWEET_ARRAY,
  };
};