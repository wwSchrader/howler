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
        return dispatch(isLoggedIn(true));
      } else {
        return dispatch(isLoggedIn(false));
      };
    })
    .catch(err => {
      return dispatch(isLoggedIn(false));
    });
  }
}