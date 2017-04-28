/**
 * @flow
 */
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';
import I18n from 'react-native-i18n';
import base64 from 'base-64';

import * as types from '../ActionTypes';
import * as Api from '../../utils/api';

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
export const finishOnboarding = createAction(types.FINISH_ONBOARDING);

// Thunks
async function getUserData(credentials: Array<string>) {
  const credential = base64.encode(`${credentials[0]}:${credentials[1]}`);
  const result = await Api.get('users/me', { Authorization: `Basic ${credential}` });
  return {
    userId: result.id,
    userName: result.username,
    nickName: result.nickname,
    email: result.email,
    isPremium: result.is_premium,
  };
}

async function signupByEmail(credentials: Array<string>) {
  const result = await Api.post('users/signup', {
    email: credentials[0],
    password: credentials[1],
    language: I18n.locale ? I18n.locale.split('-')[0] : null,
    currency: null,
  });

  return {
    userId: result.id,
    userName: result.username,
    nickName: result.nickname,
    email: result.email,
    isPremium: result.is_premium,
  };
}

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
      new Bugsnag().notify(error);
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
      const userData = await signupByEmail(credentials);
      return dispatch(fetchActSignupSuccess(userData));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(fetchActSignupFailure);
      throw error;
    }
  };

