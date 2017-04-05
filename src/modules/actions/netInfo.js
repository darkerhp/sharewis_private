/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import _ from 'lodash';
import { createAction } from 'redux-actions';
import { Client } from 'bugsnag-react-native';

import * as types from '../ActionTypes';
import { patchLectureStatus } from '../../redux/middleware/actApi';


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
        const result = await patchLectureStatus(...params);
        return result;
      });
      await Promise.all(promises);
      dispatch(triggeredQueueActions());
    } catch (error) {
      new Client().notify(error);
      console.error(error);
    }
  };
