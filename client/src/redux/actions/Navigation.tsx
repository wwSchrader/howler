import * as Types from '../constants/ActionTypes';

export function setNavigationState(navigationState: string) {
  return {
    navigationSelection: navigationState,
    type: Types.NAVIGATION_SELECTION,
  }
}