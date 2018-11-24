import * as Types from '../constants/ActionTypes';

export function isLoggedIn(userLoginStatus: boolean) {
  return {
    type: Types.USER_LOGIN,
    userLoginStatus: userLoginStatus,
  };
};

export function setUsername(usernam: string) {
  return {
    type: Types.USER_NAME,
    username:usernam
  };
};