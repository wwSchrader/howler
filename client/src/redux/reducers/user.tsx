import * as Types from '../constants/ActionTypes';

export function userIsLoggedIn(state = false, action: any) {
  switch (action.type) {
    case Types.USER_LOGIN:
      return action.userLoginStatus;
    default:
      return state;
  };
};

export function setUsername(state: undefined|null|string = null, action: any) {
  switch (action.type) {
    case Types.USERNAME:
      return action.username;
    default:
      return state;
  };
};