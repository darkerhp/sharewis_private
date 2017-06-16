/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import base64 from 'base-64';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n';
import { Client as Bugsnag } from 'bugsnag-react-native';
import { createAction, handleActions } from 'redux-actions';

import * as Api from '../utils/api';

import {
  JOIN_PREMIUM_FAILURE,
  JOIN_PREMIUM_SUCCESS,
} from './premium'; // eslint-disable-line

// Actions
export const FETCH_ACT_LOGIN_FAILURE = 'sharewis/user/FETCH_ACT_LOGIN_FAILURE';
export const FETCH_ACT_LOGIN_SUCCESS = 'sharewis/user/FETCH_ACT_LOGIN_SUCCESS';
export const FETCH_ACT_SIGNUP_FAILURE = 'sharewis/user/FETCH_ACT_SIGNUP_FAILURE';
export const FETCH_ACT_SIGNUP_SUCCESS = 'sharewis/user/FETCH_ACT_SIGNUP_SUCCESS';
export const FETCH_FB_EMAIL_FAILURE = 'sharewis/user/FETCH_FB_EMAIL_FAILURE';
export const FETCH_FB_EMAIL_SUCCESS = 'sharewis/user/FETCH_FB_EMAIL_SUCCESS';
export const FINISH_ONBOARDING = 'sharewis/user/FINISH_ONBOARDING';
export const START_ACT_EMAIL_LOGIN = 'sharewis/user/START_ACT_EMAIL_LOGIN';
export const START_ACT_EMAIL_SIGNUP = 'sharewis/user/START_ACT_EMAIL_SIGNUP';
export const START_ACT_FACEBOOK_LOGIN = 'sharewis/user/START_ACT_FACEBOOK_LOGIN';
export const START_ACT_FACEBOOK_SIGNUP = 'sharewis/user/START_ACT_FACEBOOK_SIGNUP';
export const START_FB_EMAIL_REQUEST = 'sharewis/user/START_FB_EMAIL_REQUEST';
export const CREATE_PURCHASED_GUEST_START = 'sharewis/user/CREATE_PURCHASED_GUEST_START';
export const CREATE_PURCHASED_GUEST_SUCCESS = 'sharewis/user/CREATE_PURCHASED_GUEST_SUCCESS';
export const CREATE_PURCHASED_GUEST_FAILURE = 'sharewis/user/CREATE_PURCHASED_GUEST_FAILURE';

// Reducer
const initialState = {
  userId: 0,
  password: null,
  facebookId: null,
  userName: null,
  nickName: null,
  loggedIn: false,
  isFinishOnboarding: false,
  isPremium: false,
  mixpanelId: null,
  isTemporary: false,
};

const notLogin = (state, action) => ({
  ...state,
  ...action.payload,
  loggedIn: false,
});

const login = (state, action) => ({
  ...state,
  ...action.payload,
  loggedIn: true,
  isTemporary: false,
});

export const reducer = handleActions({
  [FETCH_ACT_LOGIN_FAILURE]: notLogin,
  [FETCH_ACT_SIGNUP_FAILURE]: notLogin,
  [FETCH_FB_EMAIL_FAILURE]: notLogin,
  [FETCH_FB_EMAIL_SUCCESS]: notLogin,
  [START_ACT_EMAIL_LOGIN]: notLogin,
  [START_ACT_EMAIL_SIGNUP]: notLogin,
  [START_ACT_FACEBOOK_LOGIN]: notLogin,
  [FETCH_ACT_LOGIN_SUCCESS]: login,
  [FETCH_ACT_SIGNUP_SUCCESS]: login,
  [FINISH_ONBOARDING]: (state, action) => ({ ...state, isFinishOnboarding: true }),
  [JOIN_PREMIUM_SUCCESS]: (state, action) => ({ ...state, isPremium: true }),
  [JOIN_PREMIUM_FAILURE]: (state, action) => ({ ...state, isPremium: false }),
  [CREATE_PURCHASED_GUEST_START]: notLogin,
  [CREATE_PURCHASED_GUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    loggedIn: false,
    isTemporary: true,
  }),
  [CREATE_PURCHASED_GUEST_FAILURE]: notLogin,
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
export const createPurchasedGuestStart = createAction(CREATE_PURCHASED_GUEST_START);
export const createPurchasedGuestSuccess = createAction(CREATE_PURCHASED_GUEST_SUCCESS);
export const createPurchasedGuestFailure = createAction(CREATE_PURCHASED_GUEST_FAILURE);


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
    isTemporary: result.is_temporary,
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
    isTemporary: result.is_temporary,
  };
}

async function signupPurchasedGuestByEmail(credentials: Array<string>, userId) {
  const result = await Api.post('users/signup_purchased_guest', {
    email: credentials[0],
    password: credentials[1],
    language: I18n.locale ? I18n.locale.split('-')[0] : null,
    currency: null,
  }, { 'user-id': userId });

  return {
    userId: result.id,
    userName: result.username,
    nickName: result.nickname,
    email: result.email,
    isPremium: result.is_premium,
    isTemporary: result.is_temporary,
  };
}

export async function postPurchasedGuest() {
  const deviceId = DeviceInfo.getUniqueID();
  const userData = await Api.post('users/purchased_guest', {
    device_id: deviceId,
    language: I18n.locale ? I18n.locale.split('-')[0] : null,
    currency: null,
  });

  return {
    userId: userData.id,
    userName: userData.username,
    nickName: userData.nickname,
    email: userData.email,
    isPremium: userData.is_premium,
    isTemporary: userData.is_temporary,
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
  async (dispatch, getState) => {
    const { user } = getState();

    if (loginMethod === 'facebook') {
      // TODO Facebook signup 実装する
      dispatch(fetchFBEmailSuccess(credentials));
      dispatch(startActFacebookSignup(credentials));
    } else {
      dispatch(startActEmailSignup(credentials));
    }

    try {
      const userData = user.isTemporary === true
        ? await signupPurchasedGuestByEmail(credentials, user.id)
        : await signupByEmail(credentials);
      return dispatch(fetchActSignupSuccess(userData));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(fetchActSignupFailure);
      throw error;
    }
  };

/**
 * 購入済みゲストユーザーを作成する
 *  購入済みゲストユーザー: ゲストユーザーがコースを購入した場合に作成する仮ユーザー
 */
export const createPurchasedGuest = () =>
  async (dispatch) => {
    dispatch(createPurchasedGuestStart);
    try {
      const userData = await postPurchasedGuest();
      dispatch(createPurchasedGuestSuccess(userData));
      return userData;
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(createPurchasedGuestFailure);
      throw error;
    }
  };
