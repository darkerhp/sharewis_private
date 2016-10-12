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

export const setCurrentCourseId = courseId => ({
  type: types.SET_CURRENT_COURSE_ID,
  courseId,
});


// Thunks

export const fetchCourseList = () =>
  async(dispatch, getState) => {
    try {
      const state = getState();
      const userId = state.user.userId;
      const courseListView = state.ui.courseListView;
      if (_.isEmpty(state.entities.courses)
        || courseListView.fetchedAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchCourseListStart());
        const response = await getUserCourses(userId);
        dispatch(fetchCourseListSuccess(normalize(response, schema.arrayOfCourses)));
      }
    } catch (error) {
      dispatch(fetchCourseListFailure());
      throw error;
    }
  };
