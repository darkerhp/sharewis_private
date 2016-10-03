/* @flow */
import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const fetchNetInfo = createAction(types.MIDDLEWARE_NETINFO);

export default fetchNetInfo;
