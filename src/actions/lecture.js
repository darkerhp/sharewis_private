/* @flow */
import { syncQueueAction } from '../actions/netInfo';
import * as types from '../constants/ActionTypes';
import * as ApiConstants from '../constants/Api';
import { patchLectureStatus } from '../middleware/actApi';

// Actions Creators

export const updateLectureStatusFailure = error => ({
  type: types.UPDATE_LECTURE_STATUS_FAILURE,
  error,
});

export const updateLectureStatusStart = () => ({
  type: types.UPDATE_LECTURE_STATUS_START,
});

export const updateLectureStatusSuccess = (lectureId, status) => ({
  type: types.UPDATE_LECTURE_STATUS_SUCCESS,
  lectureId,
  status,
});

export const setCurrentLectureId = lectureId => ({
  type: types.SET_CURRENT_LECTURE_ID,
  lectureId,
});

export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});

export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});

export const pressSpeed = () => ({
  type: types.PRESS_SPEED,
});

export const updateVideoProgress = currentTime => ({
  type: types.UPDATE_VIDEO_PROGRESS,
  currentTime,
});

// Used in courseList and courseDetails reducers
export const completeLecture = () => ({
  type: types.COMPLETE_LECTURE,
});


// Thunks
export const updateLectureStatus = (lectureId, status) =>
  async (dispatch, getState) => {
    dispatch(updateLectureStatusStart());
    try {
      const { entities, user, netInfo } = getState();
      const { courses, lectures } = entities;
      const userId = user.userId;
      const lecture = lectures[lectureId];
      if (netInfo.isConnected) {
        await patchLectureStatus(userId, lecture.courseId, lectureId, status);
      } else {
        syncQueueAction(patchLectureStatus, [userId, lecture.courseId, lectureId, status]);
      }

      if (status === ApiConstants.LECTURE_STATUS_FINISHED) {
        dispatch(completeLecture(lectureId));
      } else {
        dispatch(setCurrentLectureId(lectureId));
      }
      dispatch(updateLectureStatusSuccess(lectureId, status));
    } catch (error) {
      console.error(error); // eslint-disable-line
      dispatch(updateLectureStatusFailure());
      throw error;
    }
  };
