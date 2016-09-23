/* @flow */
import * as types from '../constants/ActionTypes';


const initialState = {
  lectureCount: 0,
  lectureProgress: 0,
  lectures: {},
};

const courseReducer = (state = initialState, action) => {
  const { type, ...newState } = action;

  switch (type) {
    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        ...newState,
      };
    default:
      return state;
  }
};


export default courseReducer;
