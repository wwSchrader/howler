import { combineReducers } from 'redux';
import {
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
  setShowingUserRegOrLogin,
  setTweetArray,
  setUsername,
  showAddTweetModal,
  userIsLoggedIn,
});

export default howlerApp;