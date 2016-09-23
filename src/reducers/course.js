/* @flow */
import * as types from '../constants/ActionTypes';


const initialState = {
  lectureCount: 0,
  lectureProgress: 0,
  lectures: {},
};

const course = (state = initialState, action) => {
  const { type, ...newState } = action;

  switch (type) {
    case types.SET_CURRENT_COURSE:
      return {
        ...state,
        ...newState,
      };
    default:
      return state;
  }
};


export default course;
