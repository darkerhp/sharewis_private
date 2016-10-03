import * as types from '../constants/ActionTypes';
import { ACT_API_CACHE } from '../constants/Api';
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

export const fetchCourseDetailsSuccess = ({ course, lectures }) => ({
  type: types.FETCH_COURSE_DETAILS_SUCCESS,
  course,
  lectures,
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
// TODO lectureに移動
export const updateVideoInDeviceStatus = lectures => ({
  type: types.UPDATE_VIDEO_IN_DEVICE_STATUS,
  lectures,
});

// thunk action creators
export const fetchVideoInDeviceStatus = (courseId, lectures) => (
  async(dispatch) => {
    const promises = lectures.map(async(l) => {
      const path = FileUtils.createVideoFileName(l.id, courseId);
      const hasVideoInDevice = await FileUtils.exists(path);
      return { ...l, hasVideoInDevice };
    });
    const updateLectures = await Promise.all(promises);
    dispatch(updateVideoInDeviceStatus(updateLectures));
  }
);

export const fetchCourseDetails = () =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const userId = state.user.userId;
      const currentCourse = state.currentCourse;
      if (currentCourse.lectures.length === 0 ||
          currentCourse.fetchedAt - Date.now() > ACT_API_CACHE) {
        dispatch(fetchCourseDetailsStart());
        const result = await getCourseDetails(userId, currentCourse.id);
        dispatch(fetchCourseDetailsSuccess(result));
      }
    } catch (error) {
      dispatch(fetchCourseDetailsFailure());
      throw error;
    }
  };
