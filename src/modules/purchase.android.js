/**
 * @flow
 */
import _ from 'lodash';
import { normalize } from 'normalizr';
import { NativeModules, Platform } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as Api from '../utils/api';
import * as schema from '../lib/schema';


// Actions
export const PURCHASE_COURSE_SUCCESS = 'sharewis/purchase/PURCHASE_COURSE_SUCCESS';
export const PURCHASE_COURSE_FAILURE = 'sharewis/purchase/PURCHASE_COURSE_FAILURE';
export const RESTORE_COURSE_SUCCESS = 'sharewis/purchase/RESTORE_COURSE_SUCCESS';
export const RESTORE_COURSE_FAILURE = 'sharewis/purchase/RESTORE_COURSE_FAILURE';

// Action Creators
export const purchaseCourseSuccess = createAction(PURCHASE_COURSE_SUCCESS);
export const purchaseCourseFailure = createAction(PURCHASE_COURSE_FAILURE);
export const restoreCourseSuccess = createAction(RESTORE_COURSE_SUCCESS);
export const restoreCourseFailure = createAction(RESTORE_COURSE_FAILURE);

// Thunks
// const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);
