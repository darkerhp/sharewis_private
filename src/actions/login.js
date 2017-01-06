/**
 * @flow
 *
 * TODO userに変更予定
 */
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes';
import { getUserData, signupByEmail } from '../middleware/accountApi';


// Actions Creators
export const startActEmailLogin = createAction(types.START_ACT_EMAIL_LOGIN,
  ([email, password]) => ({ email, password }));
export const startActFacebookLogin = createAction(types.START_ACT_FACEBOOK_LOGIN,
  ([email, facebookId]) => ({ email, facebookId }));
export const fetchActLoginFailure = createAction(types.FETCH_ACT_LOGIN_FAILURE);
export const fetchActLoginSuccess = createAction(types.FETCH_ACT_LOGIN_SUCCESS,
  result => ({ ...result }));
export const fetchFBEmailFailure = createAction(types.FETCH_FB_EMAIL_FAILURE);
export const fetchFBEmailSuccess = createAction(types.FETCH_FB_EMAIL_SUCCESS,
  ([email, facebookId]) => ({ email, facebookId }));
export const startActEmailSignup = createAction(types.START_ACT_EMAIL_SIGNUP,
  ([email, password]) => ({ email, password }));
export const startActFacebookSignup = createAction(types.START_ACT_FACEBOOK_SIGNUP,
  ([email, facebookId]) => ({ email, facebookId }));
export const fetchActSignupFailure = createAction(types.FETCH_ACT_SIGNUP_FAILURE);
export const fetchActSignupSuccess = createAction(types.FETCH_ACT_SIGNUP_SUCCESS,
  result => ({ ...result }));

// Thunks
export const fetchUserBy = (loginMethod, credentials) =>
  async (dispatch) => {
    if (loginMethod === 'facebook') {
      dispatch(fetchFBEmailSuccess(credentials));
      dispatch(startActFacebookLogin(credentials));
    } else {
      dispatch(startActEmailLogin(credentials));
    }

    try {
      const data = await getUserData(credentials);
      return dispatch(fetchActLoginSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchActLoginFailure);
      throw error;
    }
  };

export const signupUserBy = (loginMethod, credentials) =>
  async (dispatch) => {
    if (loginMethod === 'facebook') {
      // TODO Facebook signup 実装する
      dispatch(fetchFBEmailSuccess(credentials));
      dispatch(startActFacebookSignup(credentials));
    } else {
      dispatch(startActEmailSignup(credentials));
    }

    try {
      const data = await signupByEmail(credentials);
      return dispatch(fetchActSignupSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchActSignupFailure);
      throw error;
    }
  };

