import * as Types from '../constants/ActionTypes';
import * as User from './User';

describe('User reducers', () => {
  describe('userIsLoggedIn', () => {
    it('should return initial state', () => {
      expect(User.userIsLoggedIn(undefined, {})).toEqual(false);
    });

    it('should handle the USER_LOGIN', () => {
      expect(User.userIsLoggedIn(false, {type: Types.USER_LOGIN, userLoginStatus: true})).toEqual(true);
      expect(User.userIsLoggedIn(true, {type: Types.USER_LOGIN, userLoginStatus: true})).toEqual(true);
    });
  });
});