/* @flow */
import { handleActions } from 'redux-actions';

const initialState = {
  currentTime: 0,
  isFullScreen: false,
  isPaused: true,
  speed: 1,
};

const speedList = [1, 1.2, 1.5, 2];

const videoPlayerReducer = handleActions({
  TOGGLE_PLAY: (state, action) => ({
    ...state,
    isPaused: !state.isPaused,
  }),
  PRESS_SPEED: (state, action) => {
    const currentIndex = speedList.indexOf(state.speed);
    const index = (currentIndex === speedList.length - 1) ? 0 : currentIndex + 1;
    return {
      ...state,
      speed: speedList[index],
    };
  },
  UPDATE_VIDEO_PROGRESS: (state, action) => ({
    ...state,
    currentTime: action.payload,
  }),
}, initialState);

export default videoPlayerReducer;
