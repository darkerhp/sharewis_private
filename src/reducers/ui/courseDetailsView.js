/* @flow */
import * as types from '../../constants/ActionTypes';

const initialState = {
  currentCourseId: 0,
  isFetching: false,
  isLectureDownloading: false,
};

const courseDetailsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_DETAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_COURSE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case types.FETCH_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case types.PRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: true,
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: false,
      };
    case types.ERROR_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: false,
      };
    case types.SET_CURRENT_COURSE_ID:
      return {
        ...state,
        currentCourseId: action.courseId,
      };
    default:
      return state;
  }
};

export default courseDetailsViewReducer;
