/* @flow */
import normalize from 'normalize-object';
import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { LECTURE_STATUS_FINISHED } from '../../constants/Api';

const lecturesReducer = handleActions({
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => ({
    ...state,
    ...normalize(action.payload.lectures.entities.lectures), // プロパティをキャメルケースに変換
  }),
  COMPLETE_LECTURE: (state, action) => {
    const lectureId = action.payload;
    const targetLecture = state[lectureId];

    return {
      ...state,
      [lectureId]: {
        ...targetLecture,
        status: LECTURE_STATUS_FINISHED,
      },
    };
  },
  BEGIN_DOWNLOAD_VIDEO: (state, action) => {
    const { lectureId, jobId } = action.payload;
    return {
      ...state,
      [lectureId]: {
        ...state[lectureId],
        isDownloading: true,
        jobId,
      },
    };
  },
  PROGRESS_DOWNLOAD_VIDEO: (state, action) => {
    const { lectureId, jobId, progress } = action.payload;
    const lecture = state[lectureId];
    if (lecture.jobId === -1) return state;
    return {
      ...state,
      [lectureId]: {
        ...state[lectureId],
        isDownloading: true,
        jobId,
        progress,
      },
    };
  },
  FINISH_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return {
      ...state,
      [lectureId]: {
        ...state[lectureId],
        hasVideoInDevice: true,
        isDownloading: false,
        jobId: -1,
        progress: 0,
      },
    };
  },
  ERROR_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return {
      ...state,
      [lectureId]: {
        ...state[lectureId],
        hasVideoInDevice: false,
        isDownloading: false,
        jobId: -1,
        progress: 0,
      },
    };
  },
  CANCEL_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return {
      ...state,
      [lectureId]: {
        ...state[lectureId],
        isDownloading: false,
        jobId: -1,
      },
    };
  },
  FINISH_DELETE_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return {
      ...state,
      [lectureId]: {
        ...state[lectureId],
        hasVideoInDevice: false,
        progress: 0,
      },
    };
  },
  UPDATE_VIDEO_IN_DEVICE_STATUS: (state, action) => {
    if (_.isEmpty(state)) return state;
    const lectures = action.payload;
    let newLectures = { ...state }; // eslint-disable-line
    lectures.forEach(l =>
      (newLectures[l.lectureId].hasVideoInDevice = l.hasVideoInDevice)
    );
    return {
      ...state,
      ...newLectures,
    };
  },
}, {});

export default lecturesReducer;
