/* @flow */
import * as types from '../constants/ActionTypes';


const initialState = {
  lectureCount: 0,
  lectureProgress: 0,
  lectures: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        ...action.currentCourse,
      };
    case types.LOAD_CURRENT_LECTURE:
      return {
        ...state,
        currentLecture: action.currentCourse,
      };
    case types.UPDATE_LECTURE_PROGRESS:
      return {
        ...state,
        lectureProgress: state.lectureProgress + action.increment,
      };
    default:
      return state;
  }
};


export default courseReducer;
