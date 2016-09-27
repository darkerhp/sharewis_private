import * as types from '../constants/ActionTypes';
import * as FileUtils from '../utils/file';

import { getCourseDetails } from '../middleware/actApi';


// Actions Creators

export const fetchCourseDetailsFailure = error => ({
  type: types.FETCH_COURSE_DETAILS_FAILURE,
  error,
});

export const fetchCourseDetailsStart = () => ({
  type: types.FETCH_COURSE_DETAILS_START,
});

export const fetchCourseDetailsSuccess = course => ({
  type: types.FETCH_COURSE_DETAILS_SUCCESS,
  course,
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
// TODO lectureに移動
export const updateDownloadStatus = (lectureId, hasVideoInDevice) => ({
  type: types.UPDATE_DOWNLOAD_STATUS,
  lectureId,
  hasVideoInDevice,
});


// Thunks


export const fetchDownloadStatus = (courseId, lectureId) => (
  async (dispatch) => {
    const path = FileUtils.createVideoFileName(lectureId, courseId);
    const result = await FileUtils.exists(path);
    dispatch(updateDownloadStatus(lectureId, result));
  }
);

export const fetchCourseDetails = courseId =>
  async (dispatch, getState) => {
    dispatch(fetchCourseDetailsStart());
    try {
      const userId = getState().user.userId;
      const course = await getCourseDetails(userId, courseId);
      dispatch(fetchCourseDetailsSuccess(course));
    } catch (error) {
      dispatch(fetchCourseDetailsFailure());
      throw error;
    }
  };
