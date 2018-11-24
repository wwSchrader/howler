import * as types from '../constants/ActionTypes';
import * as actions from './user';

describe('User actions', () => {
  it('should create an action to set user login status', () => {
    const userLoginStat = true;
    const expectedAction = {
      type: types.USER_LOGIN,
      userLoginStatus: userLoginStat,
    };

    expect(actions.isLoggedIn(userLoginStat)).toEqual(expectedAction);
  });

  it('should create an action to set username', () => {
    const usernam = 'user123';
    const expectedAction = {
      type: types.USER_NAME,
      username: usernam,
    };

    expect(actions.setUsername(usernam)).toEqual(expectedAction);
  });
});