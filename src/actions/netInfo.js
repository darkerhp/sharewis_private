/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import _ from 'lodash';
import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import { patchLectureStatus } from '../middleware/actApi';


export const fetchNetInfo = createAction(types.MIDDLEWARE_NETINFO);
export const queueLectureProgress = createAction(types.QUEUE_LECTURE_PROGRESS);
export const triggeredQueueActions = createAction(types.TRIGGERED_QUEUE_ACTIONS);

// Thunks

export const syncLectureProgress = () =>
  async (dispatch, getState) => {
    try {
      const {
        entities: { lectures },
        netInfo: { queuedLectureProgress },
        user: { userId },
      } = getState();

      if (_.isEmpty(queuedLectureProgress)) return;

      const promises = Object.keys(queuedLectureProgress).map(async (lectureId) => {
        const params = [
          userId,
          lectures[lectureId].courseId,
          lectureId,
          queuedLectureProgress[lectureId],
        ];
        return await patchLectureStatus(...params);
      });
      await Promise.all(promises);
      dispatch(triggeredQueueActions());
    } catch (error) {
      console.error(error);
    }
  };
