import { combineReducers } from 'redux';
import {
  setTweetArray,
  showAddTweetModal,
} from './tweet';
import {
  setFailedLoginMessage,
  setFailedRegistrationMessage,
  setShowingUserRegOrLogin,
  setUsername,
  userIsLoggedIn,
} from './user';

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