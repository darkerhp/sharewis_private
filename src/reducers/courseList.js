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
    case types.UPDATE_LECTURE_PROGRESS: {
      const lectureProgress = state.currentCourse.lectureProgress + action.increment;
      const currentCourse = {
        ...state.currentCourse,
        lectureProgress,
      };
      const courses = state.courses.map(c => (
        c.id !== state.currentCourse.id ? c : currentCourse
      ));
      return { ...state, courses, currentCourse };
    }
    default:
      return state;
  }
};


export default coursesReducer;
