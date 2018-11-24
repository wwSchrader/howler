import { combineReducers } from 'redux';
import { userIsLoggedIn } from './User';

const howlerApp = combineReducers({
  userIsLoggedIn,
});

export default howlerApp;