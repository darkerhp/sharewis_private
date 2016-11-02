/* @flow */
import { createAction } from 'redux-actions';

import { queueLectureProgress } from '../actions/netInfo';
import * as types from '../constants/ActionTypes';
import * as ApiConstants from '../constants/Api';
import { patchLectureStatus } from '../middleware/actApi';

// Actions Creators
export const updateLectureStatusFailure = createAction(types.UPDATE_LECTURE_STATUS_FAILURE);
export const updateLectureStatusStart = createAction(types.UPDATE_LECTURE_STATUS_START);
export const updateLectureStatusSuccess = createAction(types.UPDATE_LECTURE_STATUS_SUCCESS,
  (lectureId, status) => ({ lectureId, status }));
export const setCurrentLectureId = createAction(types.SET_CURRENT_LECTURE_ID);
export const pressFullScreen = createAction(types.PRESS_FULL_SCREEN);
export const togglePlay = createAction(types.TOGGLE_PLAY);
export const changeVideoPlaySpeed = createAction(types.CHANGE_VIDEO_PLAY_SPEED);
export const updateVideoProgress = createAction(types.UPDATE_VIDEO_PROGRESS);
export const completeLecture = createAction(types.COMPLETE_LECTURE);

// Thunks
export const updateLectureStatus = (lectureId, status) =>
  async (dispatch, getState) => {
    dispatch(updateLectureStatusStart());
    try {
      const { entities, user, netInfo } = getState();
      const { lectures } = entities;
      const userId = user.userId;
      const lecture = lectures[lectureId];
      if (netInfo.isConnected) {
        await patchLectureStatus(userId, lecture.courseId, lectureId, status);
      } else {
        dispatch(queueLectureProgress({ lectureId, status }));
      }

      if (status === ApiConstants.LECTURE_STATUS_FINISHED) {
        dispatch(completeLecture(lectureId));
      } else {
        dispatch(setCurrentLectureId(lectureId));
      }
      dispatch(updateLectureStatusSuccess(lectureId, status));
    } catch (error) {
      console.error(error);
      dispatch(updateLectureStatusFailure());
      throw error;
    }
  };
