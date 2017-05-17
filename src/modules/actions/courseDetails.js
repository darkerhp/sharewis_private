import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
import _ from 'lodash';
import { Client } from 'bugsnag-react-native';

import * as types from '../ActionTypes';
import { ACT_API_CACHE } from '../../lib/constants';
import Lecture from '../models/Lecture';
import * as FileUtils from '../../utils/file';
import * as Api from '../../utils/api';

import * as schema from '../../lib/schema';

// Actions Creators
export const fetchCourseDetailsFailure = createAction(types.FETCH_COURSE_DETAILS_FAILURE);
export const fetchCourseDetailsStart = createAction(types.FETCH_COURSE_DETAILS_START);
export const fetchCourseDetailsSuccess = createAction(types.FETCH_COURSE_DETAILS_SUCCESS);
export const pressDownloadVideo = createAction(types.PRESS_DOWNLOAD_VIDEO);
export const beginDownloadVideo = createAction(types.BEGIN_DOWNLOAD_VIDEO,
  (lectureId, jobId, statusCode) => ({ lectureId, jobId, statusCode }));
export const progressDownloadVideo = createAction(types.PROGRESS_DOWNLOAD_VIDEO,
  (lectureId, jobId, progress) => ({ lectureId, jobId, progress }));
export const finishDownloadVideo = createAction(types.FINISH_DOWNLOAD_VIDEO);
export const errorDownloadVideo = createAction(types.ERROR_DOWNLOAD_VIDEO);
export const cancelDownloadVideo = createAction(types.CANCEL_DOWNLOAD_VIDEO);
export const finishDeleteVideo = createAction(types.FINISH_DELETE_VIDEO);
export const updateVideoInDeviceStatus = createAction(types.UPDATE_VIDEO_IN_DEVICE_STATUS);

// Thunks
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
      new Client().notify(error);
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
