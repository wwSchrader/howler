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
    type: Types.SHOW_ADD_TWEET_MODAL,
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

export function addTweetApi(tweet: string) {
  return (dispatch: any) => {
    return fetch('/api/tweets/add', {
      body: JSON.stringify({tweetMessage: tweet}),
      credentials: 'include',
      method: 'PUT',
    })
    .then((resp: any) => {
      if(!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then((response) => {
      if (response.tweetPosted) {
        // if successful, close modal
        return dispatch(setShowAddTweetModal(false));
      } else {
        // handle errors here
      }
    })
    .catch((err) => {
      // handle errors here
    });
  };
};
