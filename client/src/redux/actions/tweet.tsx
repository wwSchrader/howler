import * as Types from '../constants/ActionTypes';

export function setTweetArray(tweetArray: any) {
  return {
    tweets: tweetArray,
    type: Types.TWEET_ARRAY,
  };
};

export function setShowAddTweetModal(bool: boolean) {
  return {
    showAddTweetModal: bool,
    type: Types.SHOW_USER_OR_REG_LOGIN_MODAL,
  };
};

export function getAllTweetsApi() {
  return (dispatch: any) => {
    return fetch('/api/tweets/all', {
      credentials: "include",
      method: 'GET',
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then((resp) => resp.json())
    .then((body) => {
      return dispatch(setTweetArray(body.tweets));
    })
    .catch((err) => {
      return null;
    });
  };
};