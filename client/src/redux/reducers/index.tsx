import { combineReducers } from 'redux';
import {
  setTweetArray,
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
  userIsLoggedIn,
});

export default howlerApp;