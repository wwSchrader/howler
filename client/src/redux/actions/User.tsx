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

export function setRegistrationFailedMessage(message: string|null) {
  return {
    failedRegistrationMessage: message,
    type: Types.REGISTRATION_FAILED_MESSAGE,
  };
};

export function setLoginFailedMessage(message: string|null) {
  return {
    failedLoginMessage: message,
    type: Types.LOGIN_FAILED_MESSAGE,
  };
};

export function registerUser(usernam: string, userEmail: string, userPassword: string) {
  return (dispatch: any) => {
    return fetch('/api/users/register', {
      body: JSON.stringify({username: usernam, email: userEmail, password: userPassword}),
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    })
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then(resp => resp.json())
    .then(body => {
      if (body.isRegistered) {
        dispatch(isLoggedIn(true));
        return dispatch(setRegistrationFailedMessage(null));
      } else {
        dispatch(isLoggedIn(false));
        return dispatch(setRegistrationFailedMessage(body.reason));
      };
    })
    .catch(err => {
      dispatch(isLoggedIn(false));
      return dispatch(setRegistrationFailedMessage(err));
    });
  }
}

export function loginUser(usernam: string, userPassword: string) {
  return (dispatch: any) => {
    return fetch('/api/users/login', {
      body: JSON.stringify({username: usernam, password: userPassword}),
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then((resp) => resp.json())
    .then((body) => {
      if(body.isLoggedIn) {
        return dispatch(isLoggedIn(true));
      } else {
        return dispatch(isLoggedIn(false));
      }
    })
    .catch((err) => dispatch(isLoggedIn(false)));
  }
}