import * as types from '../constants/ActionTypes';
import * as FileUtils from '../utils/file';

// Used in courseDetails and lecture reducers TODO 移動する
// eslint-disable-next-line import/prefer-default-export
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

// thunk action creators
export const fetchDownloadStatus = (courseId, lectureId) => (
  async (dispatch) => {
    const path = FileUtils.createVideoFileName(lectureId, courseId);
    const result = await FileUtils.exists(path);
    dispatch(updateDownloadStatus(lectureId, result));
  }
);
