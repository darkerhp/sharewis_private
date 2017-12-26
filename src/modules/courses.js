/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import _ from 'lodash';
import moment from 'moment';
import { Client as Bugsnag } from 'bugsnag-react-native';
import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { REHYDRATE } from 'redux-persist/constants';

import * as Api from '../utils/api';
import * as FileUtils from '../utils/file';
import * as schema from '../lib/schema';
import Course from './models/Course';
import CourseMap from './models/CourseMap';
import {
  proCourseSelector,
  snackCourseSelector,
  purchasedProCourseSelector,
  notPurchasedProCourseSelector
} from './selectors/courseSelectors';

import { UPDATE_LECTURE_STATUS_SUCCESS } from './lectures';
import { CREATE_PURCHASE_STATUS_SUCCESS } from './purchase'; // eslint-disable-line

// Actions
export const FETCH_MY_COURSE_FAILURE =
  'sharewis/courses/FETCH_MY_COURSE_FAILURE';
export const FETCH_MY_COURSE_START = 'sharewis/courses/FETCH_MY_COURSE_START';
export const FETCH_MY_COURSE_SUCCESS =
  'sharewis/courses/FETCH_MY_COURSE_SUCCESS';
export const FETCH_PRO_COURSE_FAILURE =
  'sharewis/courses/FETCH_PRO_COURSE_FAILURE';
export const FETCH_PRO_COURSE_START = 'sharewis/courses/FETCH_PRO_COURSE_START';
export const FETCH_PRO_COURSE_SUCCESS =
  'sharewis/courses/FETCH_PRO_COURSE_SUCCESS';
export const FETCH_SNACK_COURSE_FAILURE =
  'sharewis/courses/FETCH_SNACK_COURSE_FAILURE';
export const FETCH_SNACK_COURSE_START =
  'sharewis/courses/FETCH_SNACK_COURSE_START';
export const FETCH_SNACK_COURSE_SUCCESS =
  'sharewis/courses/FETCH_SNACK_COURSE_SUCCESS';
export const UPDATE_COURSE_DOWNLOADED_STATUS =
  'sharewis/courses/UPDATE_COURSE_DOWNLOADED_STATUS';

// Reducer
const initialState = new CourseMap();

const mergeEntities = (state, newCourses) =>
  state.merge(newCourses.map(course => new Course(course)));

const refreshEntities = newCourses => mergeEntities(initialState, newCourses);

const reducer = handleActions(
  {
    [FETCH_MY_COURSE_SUCCESS]: (state: CourseMap, action) => {
      const courses = action.payload.entities.courses;
      if (!courses) return state;
      return mergeEntities(state, fromJS(courses));
    },
    [FETCH_SNACK_COURSE_SUCCESS]: (state: CourseMap, action) => {
      const courses = action.payload.entities.courses;
      if (!courses) return state;
      return mergeEntities(state, fromJS(courses));
    },
    [FETCH_PRO_COURSE_SUCCESS]: (state: CourseMap, action) => {
      const courses = action.payload.entities.courses;
      if (!courses) return state;
      return mergeEntities(state, fromJS(courses));
    },
    [UPDATE_COURSE_DOWNLOADED_STATUS]: (state, action) => {
      if (_.isEmpty(state)) return state;
      const updatedCourses = action.payload;
      return state.merge(updatedCourses);
    },
    [CREATE_PURCHASE_STATUS_SUCCESS]: (state, action) => {
      const courseId = action.payload;
      return state.update(courseId.toString(), course =>
        course.set('isPurchased', true)
      );
    },
    [UPDATE_LECTURE_STATUS_SUCCESS]: (state, action) => {
      const courseId = action.payload.courseId;
      return state.update(courseId.toString(), course =>
        course.set('viewedAt', moment().format())
      );
    },
    // redux-persistのrehydrate用のreducer
    // Immutable.jsを使用する場合、変換が必要
    [REHYDRATE]: (state, action) => {
      if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities'))
        return state;
      const courses = action.payload.entities.courses;
      if (_.isEmpty(courses)) return initialState;
      return refreshEntities(fromJS(courses));
    }
  },
  initialState
);

export default reducer;

// Action Creators
export const fetchMyCourseFailure = createAction(FETCH_MY_COURSE_FAILURE);
export const fetchMyCourseStart = createAction(FETCH_MY_COURSE_START);
export const fetchMyCourseSuccess = createAction(FETCH_MY_COURSE_SUCCESS);
export const fetchSnackCourseFailure = createAction(FETCH_SNACK_COURSE_FAILURE);
export const fetchSnackCourseStart = createAction(FETCH_SNACK_COURSE_START);
export const fetchSnackCourseSuccess = createAction(FETCH_SNACK_COURSE_SUCCESS);
export const fetchProCourseFailure = createAction(FETCH_PRO_COURSE_FAILURE);
export const fetchProCourseStart = createAction(FETCH_PRO_COURSE_START);
export const fetchProCourseSuccess = createAction(FETCH_PRO_COURSE_SUCCESS);
export const updateCourseDownloadedStatus = createAction(
  UPDATE_COURSE_DOWNLOADED_STATUS
);

// side effects, only as applicable
// e.g. thunks, epics, etc
const setPurchasedToCourses = courses =>
  courses.map(course => ({ ...course, isPurchased: true }));

const normalizeCourses = response =>
  normalize(
    response.map(course => Api.keyToCamelcase(course)),
    schema.arrayOfCourses
  );

/**
 * 購入済みのプロコースを取得する
 * @param force
 */
export const fetchMyCourse = (force = false) => async (dispatch, getState) => {
  try {
    const purchasedProCourses = purchasedProCourseSelector(getState());
    const { user: { userId } } = getState();

    if (purchasedProCourses.isEmpty() || force) {
      dispatch(fetchMyCourseStart());
      const response = await Api.get('my_courses', { 'user-id': userId });
      dispatch(
        fetchMyCourseSuccess(normalizeCourses(setPurchasedToCourses(response)))
      );
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
export const fetchSnackCourse = (force = false) => async (
  dispatch,
  getState
) => {
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
export const fetchProCourse = (force = false) => async (dispatch, getState) => {
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

export const fetchCoursesDownloadStatus = () => async (dispatch, getState) => {
  const proCourses = proCourseSelector(getState());
  if (proCourses.isEmpty()) return;
  const promises = proCourses.map(async course => {
    const hasDownloadedLecture = await FileUtils.hasDownloadLectureByCourse(
      course.id
    );
    return course.set('hasDownloadedLecture', hasDownloadedLecture);
  });
  const updatedCourses = await Promise.all(promises);
  dispatch(updateCourseDownloadedStatus(updatedCourses));
};
