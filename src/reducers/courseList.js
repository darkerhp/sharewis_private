/* @flow */
import * as types from '../constants/ActionTypes';
import {
  loadCurrentLecture,
  completeCurrentLecture,
  updateCurrentCourse,
} from '../utils/reducers';

const initialState = {
  courses: [],
  error: null,
};

const courseListReducer = (state = initialState, action) => {
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
    case types.LOAD_CURRENT_LECTURE: {
      const currentCourse = loadCurrentLecture(state.currentCourse, action);
      return updateCurrentCourse(state, currentCourse);
    }
    case types.COMPLETE_CURRENT_LECTURE: {
      const currentCourse = completeCurrentLecture(state.currentCourse);
      return updateCurrentCourse(state, currentCourse);
    }
    default:
      return state;
  }
};


export default courseListReducer;
