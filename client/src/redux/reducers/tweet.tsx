import * as Types from '../constants/ActionTypes';

export function setTweetArray(state = [], action: any) {
  switch (action.type) {
    case Types.TWEET_ARRAY:
      return action.tweets;
    default:
      return state;
  };
};