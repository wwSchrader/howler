import * as Types from '../constants/ActionTypes';
import * as Navigation from './Navigation';

describe('Navigation reducers', () => {
  describe('setNavigationMode', () => {
    it('should return the initial state', () => {
      expect(Navigation.setNavigationMode('Home', {})).toEqual('Home');
    });

    it('should handle switching navigation mode states', () => {
      const newAction = {
        navigationSelection: 'UserOnlyTweets',
        type: Types.NAVIGATION_SELECTION,
      };

      expect(Navigation.setNavigationMode('Home', newAction)).toEqual('UserOnlyTweets');
    });
  })
})