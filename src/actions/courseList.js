import _ from 'lodash';
import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
import Immutable from 'immutable';

import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
import { getUserCourses } from '../middleware/actApi';
import * as schema from '../schema';
import * as FileUtils from '../utils/file';

// Actions Creators
export const fetchCourseListFailure = createAction(types.FETCH_COURSES_LIST_FAILURE);
export const fetchCourseListStart = createAction(types.FETCH_COURSES_LIST_START);
export const fetchCourseListSuccess = createAction(types.FETCH_COURSES_LIST_SUCCESS);
export const setCurrentCourseId = createAction(types.SET_CURRENT_COURSE_ID);
export const updateCourseDownloadedStatus = createAction(types.UPDATE_COURSE_DOWNLOADED_STATUS);

// Thunks
export const fetchCourseList = () =>
  async(dispatch, getState) => {
    try {
      const {
        entities: { courses },
        ui: { fetchedCourseListAt },
        user: { userId },
      } = getState();

      if (_.isEmpty(courses)
        || fetchedCourseListAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchCourseListStart());
        const response = await getUserCourses(userId);
        dispatch(fetchCourseListSuccess(normalize(response, schema.arrayOfCourses)));
      }
    } catch (error) {
      dispatch(fetchCourseListFailure());
      throw error;
    }
  };

export const fetchCoursesDownloadStatus = () =>
  async(dispatch, getState) => {
    const { entities: { courses } } = getState();
    if (_.isEmpty(courses)) return;

    const promises = Object.keys(courses).map(async(id) => {
      const hasDownloadedLecture = await FileUtils.hasVideoByCourse(id);
      return { id, hasDownloadedLecture };
    });
    const results = await Promise.all(promises);
    // stateに合わせてobjectに変換 { [courseId]: { id, hasDownloadedLecture }, ... }
    const payload = _.mapKeys(results, 'id');
    dispatch(updateCourseDownloadedStatus(payload));
  };
