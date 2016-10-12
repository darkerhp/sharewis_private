/* @flow */
import normalize from 'normalize-object';
import _ from 'lodash';
import * as types from '../../constants/ActionTypes';
import { LECTURE_STATUS_FINISHED } from '../../constants/Api';

const courseDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        ...normalize(action.response.entities.lectures), // プロパティをキャメルケースに変換
      };

    case types.COMPLETE_LECTURE: {
      const targetLecture = state[action.lectureId];

      return {
        ...state,
        [action.lectureId]: {
          ...targetLecture,
          status: LECTURE_STATUS_FINISHED,
        },
      };
    }
    case types.BEGIN_DOWNLOAD_VIDEO:
      return state;
    case types.PROGRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        [action.lectureId]: {
          ...state[action.lectureId],
          percentage: action.percentage,
          isDownloading: true,
        },
        jobId: action.jobId,
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      return {
        ...state,
        [action.lectureId]: {
          ...state[action.lectureId],
          hasVideoInDevice: true,
          isDownloading: false,
        },
        jobId: -1,
      };
    case types.ERROR_DOWNLOAD_VIDEO:
      return {
        ...state,
        [action.lectureId]: {
          ...state[action.lectureId],
          hasVideoInDevice: false,
          isDownloading: false,
        },
        jobId: -1,
      };
    case types.FINISH_DELETE_VIDEO:
      return {
        ...state,
        [action.lectureId]: {
          ...state[action.lectureId],
          hasVideoInDevice: false,
        },
      };
    case types.UPDATE_VIDEO_IN_DEVICE_STATUS: {
      if (_.isEmpty(state)) return state;
      let newLectures = { ...state }; // eslint-disable-line
      action.lectures.forEach(l =>
        (newLectures[l.lectureId].hasVideoInDevice = l.hasVideoInDevice)
      );
      return {
        ...state,
        ...newLectures,
      };
    }
    default:
      return state;
  }
};

export default courseDetailsReducer;
