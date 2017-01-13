import _ from 'lodash';
import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes';
import { getUserCourses, getSnackCourses } from '../middleware/actApi';
import * as schema from '../schema';
import * as FileUtils from '../utils/file';

// Actions Creators
export const fetchMyCourseFailure = createAction(types.FETCH_MY_COURSE_FAILURE);
export const fetchMyCourseStart = createAction(types.FETCH_MY_COURSE_START);
export const fetchMyCourseSuccess = createAction(types.FETCH_MY_COURSE_SUCCESS);
export const fetchSnackCourseFailure = createAction(types.FETCH_SNACK_COURSE_FAILURE);
export const fetchSnackCourseStart = createAction(types.FETCH_SNACK_COURSE_START);
export const fetchSnackCourseSuccess = createAction(types.FETCH_SNACK_COURSE_SUCCESS);
export const setCurrentCourseId = createAction(types.SET_CURRENT_COURSE_ID);
export const updateCourseDownloadedStatus = createAction(types.UPDATE_COURSE_DOWNLOADED_STATUS);

// Thunks
const normalizeCourses = response =>
  normalize(
    response.map(course =>
      _.mapKeys(course, (value, key) => _.camelCase(key)),
    ), schema.arrayOfCourses,
  );

export const fetchMyCourse = (force = false) =>
  async (dispatch, getState) => {
    try {
      const {
        entities: { courses },
        ui: { fetchedMyCourseAt },
        user: { userId },
      } = getState();

      if (courses.getProCourses().isEmpty() || force) {
        dispatch(fetchMyCourseStart());
        const response = await getUserCourses(userId);
        dispatch(fetchMyCourseSuccess(normalizeCourses(response)));
      }
    } catch (error) {
      dispatch(fetchMyCourseFailure());
      throw error;
    }
  };

export const fetchSnackCourse = () =>
  async (dispatch, getState) => {
    try {
      const {
        entities: { courses },
        user: { userId },
      } = getState();

      if (courses.getSnackCourses().isEmpty()) {
        dispatch(fetchSnackCourseStart());
        const response = await getSnackCourses(userId);
        dispatch(fetchSnackCourseSuccess(normalizeCourses(response)));
      }
    } catch (error) {
      dispatch(fetchSnackCourseFailure());
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
