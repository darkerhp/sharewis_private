/* @flow */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import * as types from '../constants/ActionTypes';

const initialState = {
  password: null,
  facebookId: null,
  userName: null,
  nickName: null,
  isFetching: false,
  loggedIn: false,
  loginDisabled: true,
};


export default function user(state = initialState, action) {
  const { type, ...newState } = action;

  switch (type) {
    // Handle Failures
    case types.FETCH_FB_EMAIL_FAILURE:
    case types.FETCH_ACT_LOGIN_FAILURE:
      return {
        ...state,
        ...newState,
        isFetching: false,
        loggedIn: false,
      };
    // Facebook actions
    case types.FETCH_FB_EMAIL_SUCCESS:
      return {
        ...state,
        ...newState,
        isFetching: true,
        loggedIn: false,
      };
    case types.START_ACT_FACEBOOK_LOGIN:
      return {
        ...state,
        ...newState,
        isFetching: true,
        loggedIn: false,
      };
    // Email actions
    case types.START_ACT_EMAIL_LOGIN:
      return {
        ...state,
        ...newState,
        isFetching: true,
        loggedIn: false,
      };
    // Handle Successes
    case types.FETCH_ACT_LOGIN_SUCCESS:
      return {
        ...state,
        ...newState,
        isFetching: false,
        loggedIn: true,
      };
    default:
      return state;
  }
}
