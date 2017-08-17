/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import _ from 'lodash';
import { Client as Bugsnag } from 'bugsnag-react-native';
import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { REHYDRATE } from 'redux-persist/constants';

import * as Api from '../utils/api';
import * as FileUtils from '../utils/file';
import * as schema from '../lib/schema';
import Lecture from './models/Lecture';
import LectureMap from './models/LectureMap';
import { ACT_API_CACHE } from '../lib/constants';
import { queueLectureProgress } from './netInfo';
import { setCurrentLectureId } from './ui';

// Actions
export const BEGIN_DOWNLOAD_VIDEO = 'sharewis/lectures/BEGIN_DOWNLOAD_VIDEO';
export const CANCEL_DOWNLOAD_VIDEO = 'sharewis/lectures/CANCEL_DOWNLOAD_VIDEO';
export const CHANGE_VIDEO_PLAY_SPEED = 'sharewis/lectures/CHANGE_VIDEO_PLAY_SPEED';
export const COMPLETE_LECTURE = 'sharewis/lectures/COMPLETE_LECTURE';
export const ERROR_DOWNLOAD_VIDEO = 'sharewis/lectures/ERROR_DOWNLOAD_VIDEO';
export const FETCH_COURSE_DETAILS_FAILURE = 'sharewis/lectures/FETCH_COURSE_DETAILS_FAILURE';
export const FETCH_COURSE_DETAILS_START = 'sharewis/lectures/FETCH_COURSE_DETAILS_START';
export const FETCH_COURSE_DETAILS_SUCCESS = 'sharewis/lectures/FETCH_COURSE_DETAILS_SUCCESS';
export const FINISH_DELETE_VIDEO = 'sharewis/lectures/FINISH_DELETE_VIDEO';
export const FINISH_DOWNLOAD_VIDEO = 'sharewis/lectures/FINISH_DOWNLOAD_VIDEO';
export const PRESS_DOWNLOAD_VIDEO = 'sharewis/lectures/PRESS_DOWNLOAD_VIDEO';
export const PROGRESS_DOWNLOAD_VIDEO = 'sharewis/lectures/PROGRESS_DOWNLOAD_VIDEO';
export const TOGGLE_FULL_SCREEN = 'sharewis/lectures/TOGGLE_FULL_SCREEN';
export const TOGGLE_PLAY = 'sharewis/lectures/TOGGLE_PLAY';
export const UPDATE_LECTURE_STATUS_FAILURE = 'sharewis/lectures/UPDATE_LECTURE_STATUS_FAILURE';
export const UPDATE_LECTURE_STATUS_START = 'sharewis/lectures/UPDATE_LECTURE_STATUS_START';
export const UPDATE_LECTURE_STATUS_SUCCESS = 'sharewis/lectures/UPDATE_LECTURE_STATUS_SUCCESS';
export const UPDATE_VIDEO_IN_DEVICE_STATUS = 'sharewis/lectures/UPDATE_VIDEO_IN_DEVICE_STATUS';
export const UPDATE_VIDEO_PROGRESS = 'sharewis/lectures/UPDATE_VIDEO_PROGRESS';

// Reducer
const initialState = new LectureMap();

const mergeEntities = (state, newLectures) =>
  state.merge(newLectures.map(lecture => new Lecture(lecture)));

const reducer = handleActions({
  // APIから取得したデータをstateに設定する
  [FETCH_COURSE_DETAILS_SUCCESS]: (state, action) => {
    const lectures = action.payload.entities.lectures;
    if (!lectures) return state;
    const next = mergeEntities(state, fromJS(lectures));
    return next;
  },
  [UPDATE_VIDEO_IN_DEVICE_STATUS]: (state, action) => {
    if (_.isEmpty(state)) return state;
    const lectures = action.payload;
    return state.merge(lectures);
  },
  [UPDATE_LECTURE_STATUS_SUCCESS]: (state, action) => {
    const { lectureId, status } = action.payload;
    return state.update(lectureId.toString(), lecture => (
      lecture.set('status', status)
    ));
  },
  [BEGIN_DOWNLOAD_VIDEO]: (state, action) => {
    const { lectureId, jobId } = action.payload;
    return state.update(lectureId.toString(), lecture =>
      lecture.merge({ isDownloading: true, jobId }),
    );
  },
  [PROGRESS_DOWNLOAD_VIDEO]: (state, action) => {
    const { lectureId, jobId, progress } = action.payload;
    const strLectureId = lectureId.toString();
    if (state.get(strLectureId).jobId === -1) return state;
    return state.update(strLectureId, lecture =>
      lecture.merge({ isDownloading: true, jobId, progress }),
    );
  },
  [FINISH_DOWNLOAD_VIDEO]: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId.toString(), lecture =>
      lecture.merge({
        hasVideoInDevice: true,
        isDownloading: false,
        jobId: -1,
        progress: 0,
      }),
    );
  },
  [ERROR_DOWNLOAD_VIDEO]: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId.toString(), lecture =>
      lecture.merge({
        hasVideoInDevice: false,
        isDownloading: false,
        jobId: -1,
        progress: 0,
      }),
    );
  },
  [CANCEL_DOWNLOAD_VIDEO]: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId.toString(), lecture =>
      lecture.merge({ isDownloading: false, jobId: -1 }),
    );
  },
  [FINISH_DELETE_VIDEO]: (state, action) => {
    const lectureId = action.payload;
    return state.update(lectureId.toString(), lecture =>
      lecture.merge({ hasVideoInDevice: false, progress: 0 }),
    );
  },
  // redux-persistのrehydrate用のreducer
  // Immutable.jsを使用する場合、変換が必要
  [REHYDRATE]: (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities')) return state;
    const lectures = action.payload.entities.lectures;
    if (_.isEmpty(lectures)) return initialState;
    return mergeEntities(initialState, fromJS(lectures));
  },
}, initialState);

export default reducer;


// Action Creators
export const updateLectureStatusFailure = createAction(UPDATE_LECTURE_STATUS_FAILURE);
export const updateLectureStatusStart = createAction(UPDATE_LECTURE_STATUS_START);
export const updateLectureStatusSuccess = createAction(UPDATE_LECTURE_STATUS_SUCCESS,
  (lectureId, status, courseId) => ({ lectureId, status, courseId }));
export const toggleFullScreen = createAction(TOGGLE_FULL_SCREEN);
export const togglePlay = createAction(TOGGLE_PLAY);
export const changeVideoPlaySpeed = createAction(CHANGE_VIDEO_PLAY_SPEED);
export const updateVideoProgress = createAction(UPDATE_VIDEO_PROGRESS);
export const completeLecture = createAction(COMPLETE_LECTURE);
export const fetchCourseDetailsFailure = createAction(FETCH_COURSE_DETAILS_FAILURE);
export const fetchCourseDetailsStart = createAction(FETCH_COURSE_DETAILS_START);
export const fetchCourseDetailsSuccess = createAction(FETCH_COURSE_DETAILS_SUCCESS);
export const pressDownloadVideo = createAction(PRESS_DOWNLOAD_VIDEO);
export const beginDownloadVideo = createAction(BEGIN_DOWNLOAD_VIDEO,
  (lectureId, jobId, statusCode) => ({ lectureId, jobId, statusCode }));
export const progressDownloadVideo = createAction(PROGRESS_DOWNLOAD_VIDEO,
  (lectureId, jobId, progress) => ({ lectureId, jobId, progress }));
export const finishDownloadVideo = createAction(FINISH_DOWNLOAD_VIDEO);
export const errorDownloadVideo = createAction(ERROR_DOWNLOAD_VIDEO);
export const cancelDownloadVideo = createAction(CANCEL_DOWNLOAD_VIDEO);
export const finishDeleteVideo = createAction(FINISH_DELETE_VIDEO);
export const updateVideoInDeviceStatus = createAction(UPDATE_VIDEO_IN_DEVICE_STATUS);

// side effects, only as applicable
// e.g. thunks, epics, etc
const normalizeLectures = lectures =>
  normalize(lectures.map(l => Api.keyToCamelcase(l)), schema.arrayOfLectures);

const normalizeSections = sections =>
  normalize(sections.map(s => Api.keyToCamelcase(s)), schema.arrayOfSections);

export const fetchCourseDetails = courseId =>
  async (dispatch, getState) => {
    try {
      const {
        entities: { lectures },
        ui: { fetchedCourseDetailsAt },
        user: { userId },
      } = getState();
      if (!lectures.find(l => l.courseId === courseId)
        || fetchedCourseDetailsAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchCourseDetailsStart());
        const response = await Api.get(`courses/${courseId}`, { 'user-id': userId });
        dispatch(fetchCourseDetailsSuccess(_.merge(
          normalizeLectures(response.lectures.filter(l => l.kind === Lecture.KIND_LECTURE)),
          normalizeSections(response.lectures.filter(l => l.kind === Lecture.KIND_SECTION)),
        )));
      }
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(fetchCourseDetailsFailure());
      throw error;
    }
  };

export const fetchVideoInDeviceStatus = courseId => (
  async (dispatch, getState) => {
    const { entities: { lectures } } = getState();
    if (lectures.isEmpty()) return;
    const promises = lectures.map(async (lecture) => {
      const path = FileUtils.createVideoFileName(lecture.id, courseId);
      const hasVideoInDevice = await FileUtils.exists(path);
      return lecture.set('hasVideoInDevice', hasVideoInDevice);
    });
    const updatedLectures = await Promise.all(promises);
    dispatch(updateVideoInDeviceStatus(updatedLectures));
  }
);

export const updateLectureStatus = (lectureId: number, status: string) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(updateLectureStatusStart());
    try {
      const { entities, user, netInfo } = getState();
      const { lectures } = entities;
      const userId = user.userId;
      const lecture = lectures.get(lectureId.toString());
      if (netInfo.isConnected) {
        await Api.patch(
          `courses/${lecture.courseId}/lectures/${lectureId}`,
          { status },
          { 'user-id': userId },
        );
      } else {
        dispatch(queueLectureProgress({ lectureId, status }));
      }
      dispatch(updateLectureStatusSuccess(lectureId, status, lecture.courseId));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(updateLectureStatusFailure());
      throw error;
    }
  };
