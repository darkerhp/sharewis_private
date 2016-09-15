/* @flow */
import * as types from '../constants/ActionTypes';


export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});
export const pressSpeed = () => ({
  type: types.PRESS_SPEED,
});
export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});
export const videoProgress = currentTime => ({
  type: types.VIDEO_PROGRESS,
  currentTime,
});
export const pressNextLecture = () => ({
  type: types.PRESS_NEXT_LECTURE,
});
