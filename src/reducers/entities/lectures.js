/* @flow */
import normalize from 'normalize-object';
import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import { LECTURE_STATUS_FINISHED } from '../../constants/Api';

import Lecture from '../../models/Lecture';
import LectureMap from '../../models/LectureMap';

const initialState = new LectureMap();

const mergeEntities = (state, newLectures) =>
  state.merge(newLectures.map(lecture => new Lecture(lecture)));

const lecturesReducer = handleActions({
  // APIから取得したデータをstateに設定する
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => {
    const lectures = action.payload.lectures.entities.lectures;
    if (!lectures) return state;
    return mergeEntities(state, fromJS(normalize(lectures)));
  },
  UPDATE_VIDEO_IN_DEVICE_STATUS: (state, action) => {
    if (_.isEmpty(state)) return state;
    const lectures = action.payload;
    return state.merge(lectures);
  },
  COMPLETE_LECTURE: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId, lecture => lecture.set('status', LECTURE_STATUS_FINISHED));
  },
  BEGIN_DOWNLOAD_VIDEO: (state, action) => {
    const { lectureId, jobId } = action.payload;
    return state.update(lectureId,
      (lecture) => {
        lecture.merge({
          isDownloading: true,
          jobId,
        });
      },
    );
  },
  PROGRESS_DOWNLOAD_VIDEO: (state, action) => {
    const { lectureId, jobId, progress } = action.payload;
    if (state[lectureId].jobId === -1) return state;
    return state.update(lectureId,
      (lecture) => {
        lecture.merge({
          isDownloading: true,
          jobId,
          progress,
        });
      },
    );
  },
  FINISH_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId,
      (lecture) => {
        lecture.merge({
          hasVideoInDevice: true,
          isDownloading: false,
          jobId: -1,
          progress: 0,
        });
      },
    );
  },
  ERROR_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId,
      (lecture) => {
        lecture.merge({
          hasVideoInDevice: false,
          isDownloading: false,
          jobId: -1,
          progress: 0,
        });
      },
    );
  },
  CANCEL_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId,
      (lecture) => {
        lecture.merge({
          isDownloading: false,
          jobId: -1,
        });
      },
    );
  },
  FINISH_DELETE_VIDEO: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId,
      (lecture) => {
        lecture.merge({
          hasVideoInDevice: false,
          progress: 0,
        });
      },
    );
  },
  // redux-persistのrehydrate用のreducer
  // Immutable.jsを仕様する場合、変換が必要
  [REHYDRATE]: (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities')) return state;
    const lectures = action.payload.entities.lectures;
    if (!lectures) return state;
    return mergeEntities(initialState, fromJS(normalize(lectures)));
  },
}, initialState);

export default lecturesReducer;
