import * as Types from '../constants/ActionTypes';

export function isLoggedIn(userLoginStat: boolean) {
  return {
    type: Types.USER_LOGIN,
    userLoginStatus: userLoginStat,
  };
};

export function setUsername(usernam: string) {
  return {
    type: Types.USERNAME,
    username:usernam
  };
};