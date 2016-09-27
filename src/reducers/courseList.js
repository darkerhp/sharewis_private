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
  isFetching: false,
};

const courseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_LIST_START:
      return {
        ...state,
        // API is slow. Do not show the spinner for 10sec everytime if props are
        // already registered.
        isFetching: state.courses.length === 0,
      };
    case types.FETCH_COURSES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case types.FETCH_COURSES_LIST_SUCCESS:
      return {
        ...state,
        courses: action.courses.map(course => ({
          id: course.id,
          imageUrl: course.image_url,
          lectureCount: course.lecture_count,
          lectureProgress: course.lecture_progress,
          title: course.title,
        })),
        isFetching: false,
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
