/* @flow */
// TODO video と lecture, lectures分けたほうがよさげ
/* eslint-disable no-console */
import * as types from '../constants/ActionTypes';
import * as LectureUtils from '../utils/lecture';

const initialState = {
  isPaused: true,
  speed: 1,
  isFullScreen: false,
  duration: 0,
  currentTime: 0,
};

const speedList = [1, 1.2, 1.5, 2];

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.PRESS_PLAY:
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case types.PRESS_SPEED: {
      const currentIndex = speedList.indexOf(state.speed);
      const index = (currentIndex === speedList.length - 1) ? 0 : currentIndex + 1;
      return {
        ...state,
        speed: speedList[index],
      };
    }
    case types.VIDEO_PROGRESS:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case types.LOAD_LECTURE: {
      return {
        ...state,
        ...initialState,
        lecture,
      };
    }
    default:
      return state;
  }
};

export default lecture;
