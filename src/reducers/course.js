/* @flow */
import * as types from '../constants/ActionTypes';

const initialState = {
  jobId: -1,
};

const lecture = (state, action) => {
  switch (action.type) {
    case types.START_DOWNLOAD_VIDEO:
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
    default:
      return state;
  }
};

const lectures = (state, action) => {
  switch (action.type) {
    case types.START_DOWNLOAD_VIDEO:
    case types.FINISH_DOWNLOAD_VIDEO:
    case types.PROGRESS_DOWNLOAD_VIDEO:
      return state.map(l => lecture(l, action));
    default:
      return state;
  }
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_COURSE: {
      console.log('PRESS_DOWNLOAD_VIDEO');
      return {
        ...state,
      };
    }
    case types.START_DOWNLOAD_VIDEO: {
      console.log('START_DOWNLOAD_VIDEO');
      return {
        ...state,
        course: {
          ...state.course,
          lectures: lectures(action.course.lectures, action),
        },
        jobId: action.jobId,
      };
    }
    case types.PROGRESS_DOWNLOAD_VIDEO: {
      console.log('PROGRESS_DOWNLOAD_VIDEO');
      return {
        ...state,
        course: {
          ...state.course,
          lectures: lectures(action.course.lectures, action),
        },
      };
    }
    case types.FINISH_DOWNLOAD_VIDEO: {
      console.log('FINISH_DOWNLOAD_VIDEO');
      return {
        ...state,
        course: {
          ...state.course,
          lectures: lectures(action.course.lectures, action),
        },
        jobId: -1,
      };
    }
    default:
      return state;
  }
};

export default course;
