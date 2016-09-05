export const PRESS_PLAY = 'PRESS_PLAY';
export const PRESS_RATE = 'PRESS_RATE';
export const PRESS_FULL_SCREEN = 'PRESS_FULL_SCREEN';

export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});
export const pressRate = () => ({
  type: types.PRESS_RATE,
});
export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});

export default {
  pressPlay,
  pressRate,
  pressFullScreen,
}
