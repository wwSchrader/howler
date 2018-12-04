import * as Types from '../constants/ActionTypes';
import * as User from './user';

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

  describe('setUsername', () => {
    it('should return initial state', () => {
      expect(User.setUsername(undefined, {})).toEqual(null);
    });

    it('should handle the USERNAME', () => {
      expect(User.setUsername(undefined, {type: Types.USERNAME, username: 'Sampleusername'})).toEqual('Sampleusername');
      expect(User.setUsername('Someusername', {type: Types.USERNAME, username: 'Anotherusername'})).toEqual('Anotherusername');
    });
  });

  describe('setFailedRegistrationMessage', () => {
    it('should return intial state', () => {
      expect(User.setFailedRegistrationMessage(null, {})).toEqual(null);
    });

    it('should hande the failed registration message', () => {
      expect(User.setFailedRegistrationMessage(null, {type: Types.REGISTRATION_FAILED_MESSAGE, failedRegistrationMessage: 'No password!'})).toEqual('No password!');
    });

    it('should nullify the failed registration message', () => {
      expect(User.setFailedRegistrationMessage('No password!', {type: Types.REGISTRATION_FAILED_MESSAGE, failedRegistrationMessage: null})).toEqual(null);
    });
  });

  describe('setFailedLoginMessage', () => {
    it('should return initial state', () => {
      expect(User.setFailedLoginMessage(null, {})).toEqual(null);
    });

    it('should handle the failed registration message', () => {
      expect(User.setFailedLoginMessage(null, {type: Types.LOGIN_FAILED_MESSAGE, failedLoginMessage: 'Password doesn\'t match!'})).toEqual('Password doesn\'t match!');
    });

    it('should handle nulling the failed registration message', () => {
      expect(User.setFailedLoginMessage('Password doesn\'t match!', {type: Types.LOGIN_FAILED_MESSAGE, failedLoginMessage: null})).toEqual(null);
    });
  });

  describe('setShowingUserRegOrLogin Component', () => {
    it('should return initial state', () => {
      expect(User.setShowingUserRegOrLogin(false, {})).toEqual(false);
    });

    it('should handle setting the showingUserRegOrLogin', () => {
      expect(User.setShowingUserRegOrLogin(false, {type: Types.SHOW_USER_OR_REG_LOGIN_MODAL, showUserRegOrLoginModal: true})).toEqual(true);
    });
  });
});