/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import { createAction, handleActions } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';
import I18n from 'react-native-i18n';
import base64 from 'base-64';

import * as Api from '../utils/api';

import {
  JOIN_PREMIUM_SUCCESS,
  JOIN_PREMIUM_FAILURE,
} from './premium'; // eslint-disable-line

// Actions
const FETCH_ACT_LOGIN_FAILURE = 'sharewis/user/FETCH_ACT_LOGIN_FAILURE';
const FETCH_ACT_LOGIN_SUCCESS = 'sharewis/user/FETCH_ACT_LOGIN_SUCCESS';
const FETCH_ACT_SIGNUP_FAILURE = 'sharewis/user/FETCH_ACT_SIGNUP_FAILURE';
const FETCH_ACT_SIGNUP_SUCCESS = 'sharewis/user/FETCH_ACT_SIGNUP_SUCCESS';
const FETCH_FB_EMAIL_FAILURE = 'sharewis/user/FETCH_FB_EMAIL_FAILURE';
const FETCH_FB_EMAIL_SUCCESS = 'sharewis/user/FETCH_FB_EMAIL_SUCCESS';
const FINISH_ONBOARDING = 'sharewis/user/FINISH_ONBOARDING';
const START_ACT_EMAIL_LOGIN = 'sharewis/user/START_ACT_EMAIL_LOGIN';
const START_ACT_EMAIL_SIGNUP = 'sharewis/user/START_ACT_EMAIL_SIGNUP';
const START_ACT_FACEBOOK_LOGIN = 'sharewis/user/START_ACT_FACEBOOK_LOGIN';
const START_ACT_FACEBOOK_SIGNUP = 'sharewis/user/START_ACT_FACEBOOK_SIGNUP';
const START_FB_EMAIL_REQUEST = 'sharewis/user/START_FB_EMAIL_REQUEST';

// Reducer
const initialState = {
  password: null,
  facebookId: null,
  userName: null,
  nickName: null,
  loggedIn: false,
  isFinishOnboarding: false,
  isPremium: false,
  mixpanelId: null,
};

const failure = (state, action) => ({
  ...state,
  ...action.payload,
  loggedIn: false,
});

const fetching = (state, action) => ({
  ...state,
  ...action.payload,
  loggedIn: false,
});

export const reducer = handleActions({
  [FETCH_ACT_LOGIN_FAILURE]: failure,
  [FETCH_ACT_SIGNUP_FAILURE]: failure,
  [FETCH_FB_EMAIL_FAILURE]: failure,
  [FETCH_FB_EMAIL_SUCCESS]: fetching,
  [START_ACT_EMAIL_LOGIN]: fetching,
  [START_ACT_EMAIL_SIGNUP]: fetching,
  [START_ACT_FACEBOOK_LOGIN]: fetching,
  [FETCH_ACT_LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    loggedIn: true,
  }),
  [FETCH_ACT_SIGNUP_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    loggedIn: true,
  }),
  [FINISH_ONBOARDING]: (state, action) => ({
    ...state,
    isFinishOnboarding: true,
  }),
  [JOIN_PREMIUM_SUCCESS]: (state, action) => ({
    ...state,
    isPremium: true,
  }),
  [JOIN_PREMIUM_FAILURE]: (state, action) => ({
    ...state,
    isPremium: false,
  }),
}, initialState);

export default reducer;

// Actions Creators
export const startActEmailLogin = createAction(START_ACT_EMAIL_LOGIN,
  ([email, password]) => ({ email, password }));
export const startActFacebookLogin = createAction(START_ACT_FACEBOOK_LOGIN,
  ([email, facebookId]) => ({ email, facebookId }));
export const fetchActLoginFailure = createAction(FETCH_ACT_LOGIN_FAILURE);
export const fetchActLoginSuccess = createAction(FETCH_ACT_LOGIN_SUCCESS,
  result => ({ ...result }));
export const fetchFBEmailFailure = createAction(FETCH_FB_EMAIL_FAILURE);
export const fetchFBEmailSuccess = createAction(FETCH_FB_EMAIL_SUCCESS,
  ([email, facebookId]) => ({ email, facebookId }));
export const startActEmailSignup = createAction(START_ACT_EMAIL_SIGNUP,
  ([email, password]) => ({ email, password }));
export const startActFacebookSignup = createAction(START_ACT_FACEBOOK_SIGNUP,
  ([email, facebookId]) => ({ email, facebookId }));
export const fetchActSignupFailure = createAction(FETCH_ACT_SIGNUP_FAILURE);
export const fetchActSignupSuccess = createAction(FETCH_ACT_SIGNUP_SUCCESS,
  result => ({ ...result }));
export const finishOnboarding = createAction(FINISH_ONBOARDING);


// side effects, only as applicable
// e.g. thunks, epics, etc
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

