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

export function setFailedRegistrationMessage(state: null|string = null, action: any) {
  switch (action.type) {
    case Types.REGISTRATION_FAILED_MESSAGE:
      return action.failedRegistrationMessage;
    default:
      return state;
  };
};

export function setFailedLoginMessage(state: null|string = null, action: any) {
  switch (action.type) {
    case Types.LOGIN_FAILED_MESSAGE:
      return action.failedLoginMessage;
    default:
      return state;
  };
};

export function setShowingUserRegOrLogin(state = false, action: any) {
  switch (action.type) {
    case Types.SHOW_USER_OR_REG_LOGIN_MODAL:
      return action.showUserRegOrLoginModal;
    default:
      return state;
  };
};