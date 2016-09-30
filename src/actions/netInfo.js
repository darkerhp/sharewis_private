/* @flow */
import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const netInfo = createAction(types.NET_INFO);

export default netInfo;
