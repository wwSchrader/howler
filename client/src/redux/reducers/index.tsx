import { combineReducers } from 'redux';
import { userIsLoggedIn } from './user';

const howlerApp = combineReducers({
  userIsLoggedIn,
});

export default howlerApp;