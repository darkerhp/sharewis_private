import _ from 'lodash';
import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
import { getUserCourses } from '../middleware/actApi';
import * as schema from '../schema';

// Actions Creators
export const fetchCourseListFailure = createAction(types.FETCH_COURSES_LIST_FAILURE);
export const fetchCourseListStart = createAction(types.FETCH_COURSES_LIST_START);
export const fetchCourseListSuccess = createAction(types.FETCH_COURSES_LIST_SUCCESS);
export const setCurrentCourseId = createAction(types.SET_CURRENT_COURSE_ID);

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
