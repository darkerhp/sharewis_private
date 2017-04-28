/* @flow */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import { handleActions } from 'redux-actions';

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

export const userReducer = handleActions({
  FETCH_ACT_LOGIN_FAILURE: failure,
  FETCH_ACT_SIGNUP_FAILURE: failure,
  FETCH_FB_EMAIL_FAILURE: failure,
  FETCH_FB_EMAIL_SUCCESS: fetching,
  START_ACT_EMAIL_LOGIN: fetching,
  START_ACT_EMAIL_SIGNUP: fetching,
  START_ACT_FACEBOOK_LOGIN: fetching,
  FETCH_ACT_LOGIN_SUCCESS: (state, action) => ({
    ...state,
    ...action.payload,
    loggedIn: true,
  }),
  FETCH_ACT_SIGNUP_SUCCESS: (state, action) => ({
    ...state,
    ...action.payload,
    loggedIn: true,
  }),
  FINISH_ONBOARDING: (state, action) => ({
    ...state,
    isFinishOnboarding: true,
  }),
  JOIN_PREMIUM_SUCCESS: (state, action) => ({
    ...state,
    isPremium: true,
  }),
  JOIN_PREMIUM_FAILURE: (state, action) => ({
    ...state,
    isPremium: false,
  }),
}, initialState);

export default userReducer;
