/* @flow */
import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';


export const fetchNetInfo = createAction(types.MIDDLEWARE_NETINFO);


export const syncQueueAction = (action, params) => ({
  type: types.SYNC_QUEUE_ACTION,
  queuedAction: [action, params],
});


// Thunks

export const triggerActions = () =>
  async (dispatch, getState) => {
    const { queuedActions } = getState().netInfo;
    for (const [action, params] of queuedActions.entries()) {
      dispatch(action(params));
    }
  };
