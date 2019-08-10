import { combineReducers } from 'redux';
import {
  setNavigationMode,
} from './Navigation';
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
  setNavigationMode,
  setReplyTweetArray,
  setShowingUserRegOrLogin,
  setTweetArray,
  setUsername,
  showAddTweetModal,
  userIsLoggedIn,
});

export default howlerApp;