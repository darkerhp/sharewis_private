// android用ダミーファイル
/**
 * @flow
 */
import { createAction } from 'redux-actions';

import * as types from '../ActionTypes';

// Action Creators
export const joinPremiumSuccess = createAction(types.JOIN_PREMIUM_SUCCESS);
export const joinPremiumFailure = createAction(types.JOIN_PREMIUM_FAILURE);
export const restorePremiumSuccess = createAction(types.RESTORE_PREMIUM_SUCCESS);
export const restorePremiumFailure = createAction(types.RESTORE_PREMIUM_FAILURE);

// Thunks
export const joinPremium = userId =>
  async (dispatch) => {};

export const restorePremium = () =>
  async (dispatch) => {};
