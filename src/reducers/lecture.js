/* @flow */
import * as types from '../constants/ActionTypes';

const initialState = {
  isPaused: false,
  speed: 1.0, // 1.2, 1.5, 2.0
  isFullScreen: false,
};

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.PRESS_PLAY:
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    default:
      return state;
  }
};

export default lecture;
