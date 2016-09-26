import * as types from '../constants/ActionTypes';
import { courses as dummyCourses } from '../data/dummyData'; // TODO


export const fetchCoursesListFailure = error => ({
  type: types.FETCH_COURSES_LIST_FAILURE,
  error,
});

export const fetchCoursesListSuccess = () => ({
  type: types.FETCH_COURSES_LIST_SUCCESS,
  courses: dummyCourses,
});

// used in courseList and courseDetails reducers
export const loadCurrentCourse = currentCourse => ({
  type: types.LOAD_CURRENT_COURSE,
  currentCourse,
});
