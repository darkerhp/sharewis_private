import _ from 'lodash';
import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
import { getUserCourses } from '../middleware/actApi';
import * as schema from '../schema';
import * as FileUtils from '../utils/file';

// Actions Creators
export const fetchMyCourseFailure = createAction(types.FETCH_MY_COURSE_FAILURE);
export const fetchMyCourseStart = createAction(types.FETCH_MY_COURSE_START);
export const fetchMyCourseSuccess = createAction(types.FETCH_MY_COURSE_SUCCESS);
export const setCurrentCourseId = createAction(types.SET_CURRENT_COURSE_ID);
export const updateCourseDownloadedStatus = createAction(types.UPDATE_COURSE_DOWNLOADED_STATUS);

// Thunks
const normalizeCourses = response =>
  normalize(
    response.map(course =>
      _.mapKeys(course, (value, key) => _.camelCase(key)),
    ), schema.arrayOfCourses,
  );

export const fetchMyCourse = () =>
  async (dispatch, getState) => {
    try {
      const {
        entities: { courses },
        ui: { fetchedMyCourseAt },
        user: { userId },
      } = getState();

      if (courses.isEmpty()
        || fetchedMyCourseAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchMyCourseStart());
        const response = await getUserCourses(userId);
        dispatch(fetchMyCourseSuccess(normalizeCourses(response)));
      }
    } catch (error) {
      dispatch(fetchMyCourseFailure());
      throw error;
    }
  };

export const fetchCoursesDownloadStatus = () =>
  async (dispatch, getState) => {
    const { entities: { courses } } = getState();
    if (courses.isEmpty()) return;
    const promises = courses.map(async (course) => {
      const hasDownloadedLecture = await FileUtils.hasVideoByCourse(course.id);
      return course.set('hasDownloadedLecture', hasDownloadedLecture);
    });
    const updatedCourses = await Promise.all(promises);
    dispatch(updateCourseDownloadedStatus(updatedCourses));
  };
