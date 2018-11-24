import * as Types from '../constants/ActionTypes';

export function isLoggedIn(userLoginStatus: boolean) {
  return {
    type: Types.USER_LOGIN,
    userLoginStatus: userLoginStatus,
  }
}