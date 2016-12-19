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
  (lectureId, jobId, progress) => ({ lectureId, jobId, progress }));
export const finishDownloadVideo = createAction(types.FINISH_DOWNLOAD_VIDEO);
export const errorDownloadVideo = createAction(types.ERROR_DOWNLOAD_VIDEO);
export const cancelDownloadVideo = createAction(types.CANCEL_DOWNLOAD_VIDEO);
export const finishDeleteVideo = createAction(types.FINISH_DELETE_VIDEO);
export const updateVideoInDeviceStatus = createAction(types.UPDATE_VIDEO_IN_DEVICE_STATUS);

// Thunks
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
        const response = await getCourseDetails(userId, courseId);
        dispatch(fetchCourseDetailsSuccess({
          // TODO もうちょいいい感じにできるはず
          lectures: normalize(
            response.lectures.filter(l => l.isLecture()),
            schema.arrayOfLectures),
          sections: normalize(
            response.lectures.filter(l => l.isSection()),
            schema.arrayOfSections),
        }));
      }
    } catch (error) {
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
