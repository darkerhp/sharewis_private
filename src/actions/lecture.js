/* @flow */
import * as types from '../constants/ActionTypes';


export const loadNextLecture = (course, lectureId) => ({
  type: types.LOAD_NEXT_LECTURE,
  course,
  lectureId,
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
export const updateLectureProgress = () => ({
  type: types.UPDATE_LECTURE_PROGRESS,
  increment: 1,
});
