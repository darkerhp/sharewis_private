/* @flow */
import * as types from '../constants/ActionTypes';


export const loadCurrentLecture = (lectures, currentLecture) => ({
  type: types.LOAD_CURRENT_LECTURE,
  lectures,
  currentLecture,
});

export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});

export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});

export const pressSpeed = () => ({
  type: types.PRESS_SPEED,
});

export const updateVideoProgress = currentTime => ({
  type: types.UPDATE_VIDEO_PROGRESS,
  currentTime,
});

// Used in courseList and courseDetails reducers
export const completeCurrentLecture = () => ({
  type: types.COMPLETE_CURRENT_LECTURE,
});
