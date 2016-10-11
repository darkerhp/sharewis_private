import _ from 'lodash';
import { normalize } from 'normalizr';
import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
import { getUserCourses } from '../middleware/actApi';
import * as schema from '../schema';

// Actions Creators

export const fetchCourseListFailure = error => ({
  type: types.FETCH_COURSES_LIST_FAILURE,
  error,
});

export const fetchCourseListStart = () => ({
  type: types.FETCH_COURSES_LIST_START,
});

export const fetchCourseListSuccess = response => ({
  type: types.FETCH_COURSES_LIST_SUCCESS,
  response,
});

// used in courseList and courseDetails reducers
export const loadCurrentCourse = currentCourse => ({
  type: types.LOAD_CURRENT_COURSE,
  currentCourse,
});


// Thunks

export const fetchCourseList = () =>
  async(dispatch, getState) => {
    try {
      const state = getState();
      const userId = state.user.userId;
      const courseList = state.ui.myCourseView;
      if (_.isEmpty(state.entities.courses) || courseList.fetchedAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchCourseListStart());
        const courses = await getUserCourses(userId);
        console.log('normalized response',
          normalize(courses, schema.arrayOfCourses));

        dispatch(fetchCourseListSuccess(normalize(courses, schema.arrayOfCourses)));
      }
    } catch (error) {
      dispatch(fetchCourseListFailure());
      throw error;
    }
  };
