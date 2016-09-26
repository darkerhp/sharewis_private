import * as types from '../constants/ActionTypes';
import { getUserCourses } from '../middleware/actApi';


// Actions Creators

export const fetchCourseListFailure = error => ({
  type: types.FETCH_COURSES_LIST_FAILURE,
  error,
});

export const fetchCourseListStart = () => ({
  type: types.FETCH_COURSES_LIST_START,
});

export const fetchCourseListSuccess = courses => ({
  type: types.FETCH_COURSES_LIST_SUCCESS,
  courses,
});

// used in courseList and courseDetails reducers
export const loadCurrentCourse = currentCourse => ({
  type: types.LOAD_CURRENT_COURSE,
  currentCourse,
});


// Thunks

export const fetchCourseList = () =>
  async (dispatch, getState) => {
    dispatch(fetchCourseListStart());
    try {
      const userId = getState().user.userId;
      const courses = await getUserCourses(userId);
      dispatch(fetchCourseListSuccess(courses));
    } catch (error) {
      dispatch(fetchCourseListFailure());
      throw error;
    }
  };
