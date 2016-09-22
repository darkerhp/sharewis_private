/* @flow */
import * as types from '../constants/ActionTypes';

export const loadCourse = () => ({
  type: types.LOAD_COURSE,
});
export const pressDownloadVideo = () => ({
  type: types.PRESS_DOWNLOAD_VIDEO,
});
export const beginDownloadVideo = (course, lectureId, jobId, statusCode) => ({
  type: types.BEGIN_DOWNLOAD_VIDEO,
  course,
  lectureId,
  jobId,
  statusCode,
});
export const progressDownloadVideo = (course, lectureId, percentage) => ({
  type: types.PROGRESS_DOWNLOAD_VIDEO,
  course,
  lectureId,
  percentage,
});
export const finishDownloadVideo = (course, lectureId) => ({
  type: types.FINISH_DOWNLOAD_VIDEO,
  jobId: -1,
  course,
  lectureId,
});
