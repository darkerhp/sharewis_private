/* @flow */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import { handleActions } from 'redux-actions';

const initialState = {
  password: null,
  facebookId: null,
  userName: null,
  nickName: null,
  isFetching: false,
  loggedIn: false,
  loginDisabled: true,
};

const failure = (state, action) => ({
  ...state,
  ...action.payload,
  isFetching: false,
  loggedIn: false,
});

const fetching = (state, action) => ({
  ...state,
  ...action.payload,
  isFetching: true,
  loggedIn: false,
});

export const userReducer = handleActions({
  FETCH_FB_EMAIL_FAILURE: failure,
  FETCH_ACT_LOGIN_FAILURE: failure,
  FETCH_FB_EMAIL_SUCCESS: fetching,
  START_ACT_FACEBOOK_LOGIN: fetching,
  START_ACT_EMAIL_LOGIN: fetching,
  FETCH_ACT_LOGIN_SUCCESS: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    loggedIn: true,
  }),
}, initialState);

export default userReducer;
