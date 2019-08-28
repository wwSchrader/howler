import * as Types from '../constants/ActionTypes';

export function isLoggedIn(userLoginStat: boolean) {
  return {
    type: Types.USER_LOGIN,
    userLoginStatus: userLoginStat,
  };
};

export function setUsername(usernam: undefined|null|string) {
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

export function setShowUserRegOrLoginModal(toShow: boolean) {
  return {
    showUserRegOrLoginModal: toShow,
    type: Types.SHOW_USER_OR_REG_LOGIN_MODAL,
  };
};

export function registerUser(usernam: string, userEmail: string, userPassword: string) {
  return (dispatch: any) => {
    return fetch('/api/users/register', {
      body: JSON.stringify({username: usernam, email: userEmail, password: userPassword}),
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      method: 'PUT'
    })
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then(resp => resp.json())
    .then(body => {
      if (body.registrationStatus) {
        dispatch(isLoggedIn(true));
        dispatch(setShowUserRegOrLoginModal(false));
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
        dispatch(setUsername(body.userId));
        dispatch(setShowUserRegOrLoginModal(false));
        return dispatch(isLoggedIn(true));
      } else {
        return dispatch(isLoggedIn(false));
      }
    })
    .catch((err) => dispatch(isLoggedIn(false)));
  }
}

export function logoutUser() {
  return (dispatch: any) => {
    return fetch('/api/users/logout', {
      credentials: 'include',
      method: 'GET',
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then((resp) => resp.json())
    .then((body) => {
      if(!body.isLoggedIn) {
        dispatch(setUsername(null));
        return dispatch(isLoggedIn(false));
      } else {
        throw Error('Something went wroing: ' + body);
      }
    })
    .catch((err) => {
      return err;
    });
  };
}

export function checkSession() {
  return (dispatch: any) => {
    return fetch('/api/users/checksession', {
      credentials: 'include',
      method: 'GET',
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then((res) => res.json())
    .then((body) => {
      if(!body.isLoggedIn) {
        dispatch(setUsername(null));
        dispatch(isLoggedIn(false));
        return new Promise((resolver) => {
          resolver(true);
        });
      } else {
        dispatch(setUsername(body.userId))
        dispatch(isLoggedIn(true));
        return new Promise((resolver) => {
          resolver(true);
        });
      }
    })
    .catch((err) => {
      return false;
    });
  };
};