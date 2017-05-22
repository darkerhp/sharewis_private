/**
 * @flow
 */
import _ from 'lodash';
import { normalize } from 'normalizr';
import { NativeModules, Platform } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as types from '../ActionTypes';
import * as Api from '../../utils/api';
import * as schema from '../../lib/schema';

// const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

// Action Creators
export const purchaseCourseSuccess = createAction(types.PURCHASE_COURSE_SUCCESS);
export const purchaseCourseFailure = createAction(types.PURCHASE_COURSE_FAILURE);
export const restoreCourseSuccess = createAction(types.RESTORE_COURSE_SUCCESS);
export const restoreCourseFailure = createAction(types.RESTORE_COURSE_FAILURE);

// Thunks
