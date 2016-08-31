import * as types from '../constants/ActionTypes';

// Onboarding
export const onScroll = (): Object => ({
  type: types.ON_SCROLL,
});
export const pressPrev = (): Object => ({
  type: types.PRESS_PREV,
});
export const pressNext = (): Object => ({
  type: types.PRESS_NEXT,
});
export const navigateToInitPage = (): Object => ({
  type: types.NAVIGATE_TO_INIT_PAGE,
});
