/* @flow */
import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';


export const fetchNetInfo = createAction(types.MIDDLEWARE_NETINFO);


export const queueAction = (action, params) => ({
  type: types.QUEUE_ACTION,
  action,
  params,
});
