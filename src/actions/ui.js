/**
 * @flow
 */
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes';


// Actions Creators
export const initApp = createAction(types.INIT_APP); // eslint-disable-line
export const finishOnboarding = createAction(types.FINISH_ONBOARDING); // eslint-disable-line
