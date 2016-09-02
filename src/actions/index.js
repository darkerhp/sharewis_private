import * as types from '../constants/ActionTypes';

// Onboarding
export const onScroll = () => ({
  type: types.ON_SCROLL,
});
export const pressPrev = () => ({
  type: types.PRESS_PREV,
});
export const pressNext = () => ({
  type: types.PRESS_NEXT,
});
export const navigateToInitPage = () => ({
  type: types.NAVIGATE_TO_INIT_PAGE,
});
