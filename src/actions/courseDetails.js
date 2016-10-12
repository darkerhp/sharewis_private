import _ from 'lodash';
import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
import * as FileUtils from '../utils/file';

import { getCourseDetails } from '../middleware/actApi';
import * as schema from '../schema';


// Actions Creators
export const fetchCourseDetailsFailure = createAction(types.FETCH_COURSE_DETAILS_FAILURE);
export const fetchCourseDetailsStart = createAction(types.FETCH_COURSE_DETAILS_START);
export const fetchCourseDetailsSuccess = createAction(types.FETCH_COURSE_DETAILS_SUCCESS);
export const pressDownloadVideo = createAction(types.PRESS_DOWNLOAD_VIDEO);
export const beginDownloadVideo = createAction(types.BEGIN_DOWNLOAD_VIDEO,
  (lectureId, jobId, statusCode) => ({ lectureId, jobId, statusCode }));
export const progressDownloadVideo = createAction(types.PROGRESS_DOWNLOAD_VIDEO,
  (lectureId, percentage) => ({ lectureId, percentage }));
export const finishDownloadVideo = createAction(types.FINISH_DOWNLOAD_VIDEO);
export const errorDownloadVideo = createAction(types.ERROR_DOWNLOAD_VIDEO);
export const finishDeleteVideo = createAction(types.FINISH_DELETE_VIDEO);
export const updateVideoInDeviceStatus = createAction(types.UPDATE_VIDEO_IN_DEVICE_STATUS);

// Thunks
export const fetchVideoInDeviceStatus = courseId => (
  async(dispatch, getState) => {
    const state = getState();
    const promises = Object.keys(state.entities.lectures).map(async(lectureId) => {
      const path = FileUtils.createVideoFileName(lectureId, courseId);
      const hasVideoInDevice = await FileUtils.exists(path);
      return { lectureId, hasVideoInDevice };
    });
    const updateLectures = await Promise.all(promises);
    dispatch(updateVideoInDeviceStatus(updateLectures));
  }
);

export const fetchCourseDetails = courseId =>
  async(dispatch, getState) => {
    try {
      const state = getState();
      const userId = state.user.userId;
      const courseDetailsView = state.ui.courseDetailsView;
      if (_.isEmpty(_.filter(state.entities.lectures, { courseId }))
        || courseDetailsView.fetchedAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchCourseDetailsStart());
        const response = await getCourseDetails(userId, courseId);
        dispatch(fetchCourseDetailsSuccess(normalize(response.lectures, schema.arrayOfLectures)));
        dispatch(fetchVideoInDeviceStatus());
      }
    } catch (error) {
      console.error(error); // eslint-disable-line
      dispatch(fetchCourseDetailsFailure());
      throw error;
    }
  };
