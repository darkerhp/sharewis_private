/* @flow */
import { handleActions } from 'redux-actions';

const initialState = {
  currentCourseId: 0,
  isFetching: false,
  isLectureDownloading: false,
};

const courseDetailsViewReducer = handleActions({
  FETCH_COURSE_DETAILS_START: (state, action) => ({
    ...state,
    isFetching: true,
  }),
  FETCH_COURSE_DETAILS_FAILURE: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => ({
    ...state,
    isFetching: false,
  }),
  PRESS_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    isLectureDownloading: true,
  }),
  FINISH_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    isLectureDownloading: false,
  }),
  ERROR_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    isLectureDownloading: false,
  }),
  SET_CURRENT_COURSE_ID: (state, action) => ({
    ...state,
    currentCourseId: action.payload,
  }),
}, initialState);

export default courseDetailsViewReducer;
