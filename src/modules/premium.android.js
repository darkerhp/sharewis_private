// android用ダミーファイル
/**
 * @flow
 */
import { createAction } from 'redux-actions';

// Actions
export const JOIN_PREMIUM_SUCCESS = 'sharewis/premium/JOIN_PREMIUM_SUCCESS';
export const JOIN_PREMIUM_FAILURE = 'sharewis/premium/JOIN_PREMIUM_FAILURE';
export const RESTORE_PREMIUM_SUCCESS = 'sharewis/premium/RESTORE_PREMIUM_SUCCESS';
export const RESTORE_PREMIUM_FAILURE = 'sharewis/premium/RESTORE_PREMIUM_FAILURE';

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
