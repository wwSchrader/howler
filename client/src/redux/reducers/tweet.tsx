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
    case Types.SHOW_USER_OR_REG_LOGIN_MODAL:
      return action.showAddTweetModal;
    default:
      return state;
  };
};