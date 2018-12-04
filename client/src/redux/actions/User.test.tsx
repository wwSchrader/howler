import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as actions from './user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
      type: types.USERNAME,
      username: usernam,
    };

    expect(actions.setUsername(usernam)).toEqual(expectedAction);
  });

  it('should create an action to set registration failed message', () => {
    const message = 'Registration failed!';
    const expectedAction = {
      failedRegistrationMessage: message,
      type: types.REGISTRATION_FAILED_MESSAGE,
    };

    expect(actions.setRegistrationFailedMessage(message)).toEqual(expectedAction);
  });

  it('should create an action to set login failed message', () => {
    const message = 'Login Failed!';
    const expectedAction = {
      failedLoginMessage: message,
      type: types.LOGIN_FAILED_MESSAGE,
    };

    expect(actions.setLoginFailedMessage(message)).toEqual(expectedAction);
  });

  it('should create an action to set the showing of UserRegOrLoginModal', () => {
    const expectedAction = {
      showUserRegOrLoginModal: true,
      type: types.SHOW_USER_OR_REG_LOGIN_MODAL,
    };

    expect(actions.setShowUserRegOrLoginModal(true)).toEqual(expectedAction);
  });

  describe('registerUser thunk action', () => {
    afterEach(() => {
      fetchMock.restore()
    });

    it('creates USER_LOGIN when fetching register user has been done', () => {
      const store = mockStore({});
      const expectedActions = [
        {
        type: types.USER_LOGIN,
        userLoginStatus: true,
        },
        {
          failedRegistrationMessage: null,
          type: types.REGISTRATION_FAILED_MESSAGE,
        },
      ];
  
      fetchMock.putOnce('/api/users/register', {isRegistered: true});
  
      return store.dispatch<any>(actions.registerUser('someusername', 'someemail', 'somepassword'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('create USER_LOGIN as false when fetching register user has been done', () => {
      const store = mockStore({});
      const expectedActions = [
        {
        type: types.USER_LOGIN,
        userLoginStatus: false,
        },
        {
          failedRegistrationMessage: 'Username already taken!',
          type: types.REGISTRATION_FAILED_MESSAGE,
        }
      ];

      fetchMock.putOnce('/api/users/register', {isRegistered: false, reason: 'Username already taken!'});

      return store.dispatch<any>(actions.registerUser('anoterusername', 'anotheremail', 'anotherpassword'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('loginUser thunk action', () => {
    afterEach(() => {
      fetchMock.restore()
    });

    it('should create a true userlogin action upon successful login', () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: types.USER_LOGIN,
          userLoginStatus: true,
        },
      ];

      fetchMock.postOnce('/api/users/login', {isLoggedIn: true});

      return store.dispatch<any>(actions.loginUser('sampleusername', 'samplepassword'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should create a false userlogin action upon failed login', () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: types.USER_LOGIN,
          userLoginStatus: false,
        },
      ];

      fetchMock.postOnce('/api/users/login', {isLoggedIn: false});

      return store.dispatch<any>(actions.loginUser('sampleusername', 'samplepassword'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });

  describe('logout thunk action', () => {
    afterEach(() => {
      fetchMock.restore()
    });

    it('should create a false userlogin action', () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: types.USER_LOGIN,
          userLoginStatus: false,
        },
      ];
      
      fetchMock.getOnce('/api/users/logout', {isLoggedIn: false});

      return store.dispatch<any>(actions.logoutUser())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});