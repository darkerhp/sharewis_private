/* @flow */
import * as types from '../constants/ActionTypes';

const initialState = {
  courses: [],
  error: null,
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.FETCH_COURSES_LIST_SUCCESS:
      return {
        ...state,
        courses: action.courses,
      };
    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.currentCourse,
      };
    default:
      return state;
  }
};


export default coursesReducer;
