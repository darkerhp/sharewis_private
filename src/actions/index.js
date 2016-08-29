import * as types from '../constants/ActionTypes';

// Onboarding
export const onScroll = (): ReactElement => ({
  type: types.ON_SCROLL,
});
export const pressPrev = (): ReactElement => ({
  type: types.PRESS_PREV,
});
export const pressNext = (): ReactElement => ({
  type: types.PRESS_NEXT,
});
export const navigateToInitPage = (): ReactElement => ({
  type: types.NAVIGATE_TO_INIT_PAGE,
});
