/* @flow */
import * as types from '../constants/ActionTypes';

const initialState = {
  isPaused: false,
  rate: 1,
  isFullScreen: false,
};

const rateList = [1, 1.2, 1.5, 2];

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.PRESS_PLAY:
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case types.PRESS_RATE: {
      const currentIndex = rateList.indexOf(state.rate);
      const index = (currentIndex === rateList.length - 1) ? 0 : currentIndex + 1;
      return {
        ...state,
        rate: rateList[index],
      };
    }
    default:
      return state;
  }
};

export default lecture;
