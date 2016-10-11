import _ from 'lodash';
import { normalize } from 'normalizr';

import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
import * as FileUtils from '../utils/file';

import { getCourseDetails } from '../middleware/actApi';
import * as schema from '../schema';


// Actions Creators

export const fetchCourseDetailsFailure = error => ({
  type: types.FETCH_COURSE_DETAILS_FAILURE,
  error,
});

export const fetchCourseDetailsStart = () => ({
  type: types.FETCH_COURSE_DETAILS_START,
});

export const fetchCourseDetailsSuccess = (response) => ({
  type: types.FETCH_COURSE_DETAILS_SUCCESS,
  response,
});

// Used in courseDetails and lecture reducers
export const loadCurrentLecture = (lectures, currentLecture) => ({
  type: types.LOAD_CURRENT_LECTURE,
  lectures, // lecture reducers
  currentLecture,
});
export const pressDownloadVideo = () => ({
  type: types.PRESS_DOWNLOAD_VIDEO,
});
export const beginDownloadVideo = (lectureId, jobId, statusCode) => ({
  type: types.BEGIN_DOWNLOAD_VIDEO,
  lectureId,
  jobId,
  statusCode,
});
export const progressDownloadVideo = (lectureId, percentage) => ({
  type: types.PROGRESS_DOWNLOAD_VIDEO,
  lectureId,
  percentage,
});
export const finishDownloadVideo = lectureId => ({
  type: types.FINISH_DOWNLOAD_VIDEO,
  jobId: -1,
  lectureId,
});
export const errorDownloadVideo = lectureId => ({
  type: types.ERROR_DOWNLOAD_VIDEO,
  jobId: -1,
  lectureId,
});
export const finishDeleteVideo = lectureId => ({
  type: types.FINISH_DELETE_VIDEO,
  jobId: -1,
  lectureId,
});
export const updateVideoInDeviceStatus = lectures => ({
  type: types.UPDATE_VIDEO_IN_DEVICE_STATUS,
  lectures,
});

// thunk action creators
export const fetchVideoInDeviceStatus = (courseId) => (
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
  async (dispatch, getState) => {
    try {
      const state = getState();
      const userId = state.user.userId;
      const courseView = state.ui.courseView;
      if (_.isEmpty(_.filter(state.entities.lectures, { courseId }))
        || courseView.fetchedAt - Date.now() > ACT_API_CACHE) {
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
