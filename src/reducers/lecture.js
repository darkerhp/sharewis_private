/* @flow */
// TODO video と lecture, lectures分けたほうがよさげ
import * as types from '../constants/ActionTypes';
import * as LectureUtils from '../utils/lecture';

const initialState = {
  currentTime: 0,
  duration: 0,
  id: 0,
  isCompleted: false,
  isFullScreen: false,  // TODO
  isLastLecture: false,
  isPaused: true,
  speed: 1,
  title: undefined,
  url: undefined,
};

const speedList = [1, 1.2, 1.5, 2];

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_LECTURE:
      return {
        ...state,
        ...action.currentLecture,
      };
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
    case types.UPDATE_VIDEO_PROGRESS:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    default:
      return state;
  }
};

export default lecture;
