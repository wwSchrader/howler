import * as Types from '../constants/ActionTypes';

export function setTweetArray(state = [], action: any) {
  switch (action.type) {
    case Types.TWEET_ARRAY:
      return action.tweets;
    default:
      return state;
  };
};

export function showAddTweetModal(state = false, action: any) {
  switch (action.type) {
    case Types.SHOW_ADD_TWEET_MODAL:
      return action.showAddTweetModal;
    default:
      return state;
  };
};