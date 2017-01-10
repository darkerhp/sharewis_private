/* @flow */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import { handleActions } from 'redux-actions';

const initialState = {
  password: null,
  facebookId: null,
  userName: null,
  nickName: null,
  loggedIn: false,
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
}, initialState);

export default userReducer;
