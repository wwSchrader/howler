import { combineReducers } from 'redux';
import {
  setReplyTweetArray,
  setTweetArray,
  showAddTweetModal,
} from './Tweet';
import {
  setFailedLoginMessage,
  setFailedRegistrationMessage,
  setShowingUserRegOrLogin,
  setUsername,
  userIsLoggedIn,
} from './User';

const howlerApp = combineReducers({
  setFailedLoginMessage,
  setFailedRegistrationMessage,
  setReplyTweetArray,
  setShowingUserRegOrLogin,
  setTweetArray,
  setUsername,
  showAddTweetModal,
  userIsLoggedIn,
});

export default howlerApp;