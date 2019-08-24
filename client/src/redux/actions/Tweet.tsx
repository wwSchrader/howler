import * as Types from '../constants/ActionTypes';

export function setTweetArray(tweetArray: any) {
  return {
    tweets: tweetArray,
    type: Types.TWEET_ARRAY,
  };
};

export function setReplyTweetArray(replyArray: any) {
  return {
    replies: replyArray,
    type: Types.REPLY_ARRAY,
  };
};

export function setShowAddTweetModal(bool: boolean) {
  return {
    showAddTweetModal: bool,
    type: Types.SHOW_ADD_TWEET_MODAL,
  };
};

export function setShowReplyTweetModal(bool: boolean) {
  return {
    showReplyTweetModal: bool,
    type: Types.SHOW_REPLY_TWEET_MODAL,
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

export function getReplyTweetsApi(SingleReplyId: any) {
  return (dispatch: any) => {
    return fetch(`/api/tweets/replies/${SingleReplyId}`, {
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
      return dispatch(setReplyTweetArray(body.replies));
    })
    .catch((err) => {
      return null;
    });
  };
};

export function addTweetApi(tweet: string, replyTweetId: string | null, retweetTweetId: string | null, toggleModal: (() => void) | null) {
  return (dispatch: any) => {
    return fetch('/api/tweets/add', {
      body: JSON.stringify({tweetMessage: tweet, replyId: replyTweetId, retweetId: retweetTweetId}),
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
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
        // if successful, close modals
        if(toggleModal) {
          toggleModal();
        };
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
