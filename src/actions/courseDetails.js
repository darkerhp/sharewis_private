import * as types from '../constants/ActionTypes';


// Used in courseDetails and lecture reducers
// eslint-disable-next-line import/prefer-default-export
export const loadCurrentLecture = (lectures, currentLecture) => ({
  type: types.LOAD_CURRENT_LECTURE,
  lectures,
  currentLecture,
});
export const pressDownloadVideo = () => ({
  type: types.PRESS_DOWNLOAD_VIDEO,
});
export const beginDownloadVideo = (lectures, lectureId, jobId, statusCode) => ({
  type: types.BEGIN_DOWNLOAD_VIDEO,
  lectures,
  lectureId,
  jobId,
  statusCode,
});
export const progressDownloadVideo = (lectures, lectureId, percentage) => ({
  type: types.PROGRESS_DOWNLOAD_VIDEO,
  lectures,
  lectureId,
  percentage,
});
export const finishDownloadVideo = (lectures, lectureId) => ({
  type: types.FINISH_DOWNLOAD_VIDEO,
  jobId: -1,
  lectures,
  lectureId,
});
