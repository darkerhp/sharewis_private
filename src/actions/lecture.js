// Constants
export const PRESS_PLAY = 'PRESS_PLAY';
export const PRESS_RATE = 'PRESS_RATE';
export const PRESS_FULL_SCREEN = 'PRESS_FULL_SCREEN';

// ActionCreators
export const pressPlay = () => ({
  type: PRESS_PLAY,
});
export const pressRate = () => ({
  type: PRESS_RATE,
});
export const pressFullScreen = () => ({
  type: PRESS_FULL_SCREEN,
});

export default {
  pressPlay,
  pressRate,
  pressFullScreen,
};
