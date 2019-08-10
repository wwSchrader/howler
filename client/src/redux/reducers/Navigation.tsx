import * as Types from '../constants/ActionTypes';

export function setNavigationMode(state = 'Home', action: any) {
  switch (action.type) {
    case Types.NAVIGATION_SELECTION:
      return action.navigationSelection;
    default:
      return state;
  };
};