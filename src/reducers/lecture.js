/* @flow */
import * as types from '../constants/ActionTypes';

const initialState = {
  isPaused: false,
  rate: 1,
  isFullScreen: false,
};

const rates = [1, 1.2, 1.5, 2];

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.PRESS_PLAY:
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case types.PRESS_RATE: {
      let idx = rates.indexOf(state.rate);
      idx = (idx === 3) ? 0 : idx + 1;
      return {
        ...state,
        rate: rates[idx],
      };
    }
    default:
      return state;
  }
};

export default lecture;
