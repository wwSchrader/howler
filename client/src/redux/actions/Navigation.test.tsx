import * as types from '../constants/ActionTypes';
import * as actions from './Navigation';

describe('Navigation actions', () => {
  describe('navigation state', () => {
    it('should create an action to set the navigation state', () => {
      const expectedAction = {
        navigationSelection: 'User',
        type: types.NAVIGATION_SELECTION,
      };

      expect(actions.setNavigationState('User')).toEqual(expectedAction);
    });
  });
});