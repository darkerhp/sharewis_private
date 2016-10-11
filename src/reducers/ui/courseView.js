/* @flow */
import * as types from '../../constants/ActionTypes';
import { ACT_API_CACHE } from '../../constants/Api';

const initialState = {
  isFetching: false,
  isLectureDownloading: false,
};

const courseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_DETAILS_START:
      return {
        ...state,
        isFetching: state.entities.lectures.length === 0,
      };
    case types.FETCH_COURSE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
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
    default:
      return state;
  }
};

export default courseDetailsReducer;
