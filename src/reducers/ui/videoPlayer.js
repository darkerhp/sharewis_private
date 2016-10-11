/* @flow */
import * as types from '../../constants/ActionTypes';

const initialState = {
  currentTime: 0,
  isFullScreen: false,
  isPaused: true,
  speed: 1,
};

const speedList = [1, 1.2, 1.5, 2];

const videoPlayerReducer = (state = initialState, action) => {
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
    case types.UPDATE_VIDEO_PROGRESS:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    default:
      return state;
  }
};

export default videoPlayerReducer;
