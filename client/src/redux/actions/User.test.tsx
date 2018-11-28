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
  
      fetchMock.postOnce('/api/users/register', {isRegistered: true});
  
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

      fetchMock.postOnce('/api/users/register', {isRegistered: false, reason: 'Username already taken!'});

      return store.dispatch<any>(actions.registerUser('anoterusername', 'anotheremail', 'anotherpassword'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});