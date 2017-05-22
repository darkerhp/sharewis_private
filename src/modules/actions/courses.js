import _ from 'lodash';
import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import * as types from '../ActionTypes';
import * as schema from '../../lib/schema';
import * as FileUtils from '../../utils/file';
import * as Api from '../../utils/api';

import {
  proCourseSelector,
  snackCourseSelector,
  purchasedProCourseSelector,
  notPurchasedProCourseSelector,
} from '../selectors/courseSelectors';

// Actions Creators
export const fetchMyCourseFailure = createAction(types.FETCH_MY_COURSE_FAILURE);
export const fetchMyCourseStart = createAction(types.FETCH_MY_COURSE_START);
export const fetchMyCourseSuccess = createAction(types.FETCH_MY_COURSE_SUCCESS);
export const fetchSnackCourseFailure = createAction(types.FETCH_SNACK_COURSE_FAILURE);
export const fetchSnackCourseStart = createAction(types.FETCH_SNACK_COURSE_START);
export const fetchSnackCourseSuccess = createAction(types.FETCH_SNACK_COURSE_SUCCESS);
export const fetchProCourseFailure = createAction(types.FETCH_PRO_COURSE_FAILURE);
export const fetchProCourseStart = createAction(types.FETCH_PRO_COURSE_START);
export const fetchProCourseSuccess = createAction(types.FETCH_PRO_COURSE_SUCCESS);
export const setCurrentCourseId = createAction(types.SET_CURRENT_COURSE_ID);
export const updateCourseDownloadedStatus = createAction(types.UPDATE_COURSE_DOWNLOADED_STATUS);


// Util functions
const setPurchasedToCourses = courses => courses.map(course => ({ ...course, isPurchased: true }));

// Thunks
const normalizeCourses = response =>
  normalize(response.map(course => Api.keyToCamelcase(course)), schema.arrayOfCourses);

/**
 * 購入済みのプロコースを取得する
 * @param force
 */
export const fetchMyCourse = (force = false) =>
  async (dispatch, getState) => {
    try {
      const purchasedProCourses = purchasedProCourseSelector(getState());
      const { user: { userId } } = getState();

      if (purchasedProCourses.isEmpty() || force) {
        dispatch(fetchMyCourseStart());
        const response = await Api.get('my_courses', { 'user-id': userId });
        dispatch(fetchMyCourseSuccess(normalizeCourses(setPurchasedToCourses(response))));
      }
    } catch (error) {
      dispatch(fetchMyCourseFailure());
      throw error;
    }
  };

/**
 * スナックコースを取得する
 * @param force
 */
export const fetchSnackCourse = (force = false) =>
  async (dispatch, getState) => {
    try {
      const snackCourses = snackCourseSelector(getState());
      const { user: { userId } } = getState();

      if (snackCourses.isEmpty() || force) {
        dispatch(fetchSnackCourseStart());
        const response = await Api.get('snack_courses', { 'user-id': userId });
        dispatch(fetchSnackCourseSuccess(normalizeCourses(response)));
      }
    } catch (error) {
      dispatch(fetchSnackCourseFailure());
      throw error;
    }
  };

/**
 * 未購入のプロコースを取得する
 * @param force
 */
export const fetchProCourse = (force = false) =>
  async (dispatch, getState) => {
    try {
      const notPurchasedProCourses = notPurchasedProCourseSelector(getState());
      const { user: { userId } } = getState();

      if (notPurchasedProCourses.isEmpty() || force) {
        dispatch(fetchProCourseStart());
        const response = await Api.get('pro_courses', { 'user-id': userId });
        dispatch(fetchProCourseSuccess(normalizeCourses(response)));
      }
    } catch (error) {
      dispatch(fetchProCourseFailure());
      throw error;
    }
  };

export const fetchCoursesDownloadStatus = () =>
  async (dispatch, getState) => {
    const proCourses = proCourseSelector(getState());
    if (proCourses.isEmpty()) return;
    const promises = proCourses.map(async (course) => {
      const hasDownloadedLecture = await FileUtils.hasVideoByCourse(course.id);
      return course.set('hasDownloadedLecture', hasDownloadedLecture);
    });
    const updatedCourses = await Promise.all(promises);
    dispatch(updateCourseDownloadedStatus(updatedCourses));
  };
