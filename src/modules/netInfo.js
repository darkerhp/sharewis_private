/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import _ from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { Client } from 'bugsnag-react-native';

import * as Api from '../utils/api';

// Actions
const MIDDLEWARE_NETINFO = 'sharewis/netInfo/MIDDLEWARE_NETINFO';
const QUEUE_LECTURE_PROGRESS = 'sharewis/netInfo/QUEUE_LECTURE_PROGRESS';
const TRIGGERED_QUEUE_ACTIONS = 'sharewis/netInfo/TRIGGERED_QUEUE_ACTIONS';

// Reducer
const initialState = {
  isConnected: false,
  queuedLectureProgress: {}, // { [lectureId]: [status]  }
};

const reducer = handleActions({
  [MIDDLEWARE_NETINFO]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [QUEUE_LECTURE_PROGRESS]: (state, action) => {
    const { lectureId, status } = action.payload;
    return {
      ...state,
      queuedLectureProgress: {
        ...state.queuedLectureProgress,
        [lectureId]: status,
      },
    };
  },
  [TRIGGERED_QUEUE_ACTIONS]: (state, action) => ({
    ...state,
    queuedLectureProgress: {},
  }),
}, initialState);

export default reducer;

// Action Creators
export const fetchNetInfo = createAction(MIDDLEWARE_NETINFO);
export const queueLectureProgress = createAction(QUEUE_LECTURE_PROGRESS);
export const triggeredQueueActions = createAction(TRIGGERED_QUEUE_ACTIONS);

// side effects, only as applicable
// e.g. thunks, epics, etc
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
        const result = await Api.patch(
          `courses/${lectures[lectureId].courseId}/lectures/${lectureId}`,
          { status: queuedLectureProgress[lectureId] },
          { 'user-id': userId },
        );

        return result;
      });
      await Promise.all(promises);
      dispatch(triggeredQueueActions());
    } catch (error) {
      new Client().notify(error);
      console.error(error);
    }
  };
