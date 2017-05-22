/**
 * @flow
 */
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import { queueLectureProgress } from '../netInfo';
import * as types from '../ActionTypes';
import Lecture from '../models/Lecture';
import * as Api from '../../utils/api';

// Actions Creators
export const updateLectureStatusFailure = createAction(types.UPDATE_LECTURE_STATUS_FAILURE);
export const updateLectureStatusStart = createAction(types.UPDATE_LECTURE_STATUS_START);
export const updateLectureStatusSuccess = createAction(types.UPDATE_LECTURE_STATUS_SUCCESS,
  (lectureId, status) => ({ lectureId, status }));
export const setCurrentLectureId = createAction(types.SET_CURRENT_LECTURE_ID);
export const toggleFullScreen = createAction(types.TOGGLE_FULL_SCREEN);
export const togglePlay = createAction(types.TOGGLE_PLAY);
export const changeVideoPlaySpeed = createAction(types.CHANGE_VIDEO_PLAY_SPEED);
export const updateVideoProgress = createAction(types.UPDATE_VIDEO_PROGRESS);
export const completeLecture = createAction(types.COMPLETE_LECTURE);

// Thunks
export const updateLectureStatus = (lectureId: number, status: string) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(updateLectureStatusStart());
    try {
      const { entities, user, netInfo } = getState();
      const { lectures } = entities;
      const userId = user.userId;
      const lecture = lectures.get(lectureId.toString());
      if (netInfo.isConnected) {
        await Api.patch(
          `courses/${lecture.courseId}/lectures/${lectureId}`,
          { status },
          { 'user-id': userId },
        );
      } else {
        dispatch(queueLectureProgress({ lectureId, status }));
      }

      if (status === Lecture.STATUS_FINISHED) {
        dispatch(completeLecture(lectureId));
      } else {
        dispatch(setCurrentLectureId(lectureId));
      }
      dispatch(updateLectureStatusSuccess(lectureId, status));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(updateLectureStatusFailure());
      throw error;
    }
  };
