/* @flow */
import * as types from '../constants/ActionTypes';
import { loadCurrentLecture, completeCurrentLecture } from '../utils/reducers';


const initialState = {
  id: 0,
  currentLecture: undefined,
  lectureCount: 0,
  lectureProgress: 0,
  lectures: [],
  jobId: -1,
  isLectureDownloading: false,
};

// TODO 移動する
const lecture = (state, action) => {
  switch (action.type) {
    case types.BEGIN_DOWNLOAD_VIDEO:
      if (state.id !== action.lectureId) return state;

      return {
        ...state,
        isDownloading: true,
      };
    case types.PROGRESS_DOWNLOAD_VIDEO:
      if (state.id !== action.lectureId) return state;

      return {
        ...state,
        isDownloading: true,
        percentage: action.percentage,
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      if (state.id !== action.lectureId) return state;

      return {
        ...state,
        isDownloading: false,
        isDownloaded: true,
      };
    case types.UPDATE_DOWNLOAD_STATUS:
      if (state.id !== action.lectureId) return state;

      return {
        ...state,
        isDownloaded: action.isDownloaded,
      };
    default:
      return state;
  }
};

// TODO 移動する
const lectures = (state, action) => {
  switch (action.type) {
    case types.LOAD_COURSE:
    case types.BEGIN_DOWNLOAD_VIDEO:
    case types.FINISH_DOWNLOAD_VIDEO:
    case types.PROGRESS_DOWNLOAD_VIDEO:
    case types.UPDATE_DOWNLOAD_STATUS:
      return state.map(l => lecture(l, action));
    default:
      return state;
  }
};

const courseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        ...action.currentCourse,
      };
    case types.LOAD_CURRENT_LECTURE:
      return loadCurrentLecture(state, action);
    case types.COMPLETE_CURRENT_LECTURE: {
      return completeCurrentLecture(state);
    }
    case types.PRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: true,
      };
    case types.BEGIN_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectures(state.lectures, action),
        jobId: action.jobId,
      };
    case types.PROGRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectures(state.lectures, action),
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: false,
        lectures: lectures(state.lectures, action),
        jobId: -1,
      };
    case types.UPDATE_DOWNLOAD_STATUS:
      return {
        ...state,
        lectures: lectures(state.lectures, action),
      };
    default:
      return state;
  }
};

export default courseDetailsReducer;
