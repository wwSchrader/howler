import * as Types from '../constants/ActionTypes';

export function userIsLoggedIn(state = false, action: any) {
  switch (action.type) {
    case Types.USER_LOGIN:
      return action.userLoginStatus;
    default:
      return state;
  };
};