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
  switch (action.type) {
    case types.ENABLE_EMAIL_LOGIN:
    case types.DISABLE_EMAIL_LOGIN:
      return {
        ...state,
        loginDisabled: action.loginDisabled,
      };
    case types.FETCH_FB_EMAIL_FAILURE:
    case types.FETCH_ACT_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        loggedIn: action.loggedIn,
      };
    case types.FETCH_FB_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: true,
        email: action.email,
        facebookId: action.facebookId,
      };
    case types.START_ACT_EMAIL_LOGIN:
      return {
        ...state,
        isFetching: true,
        password: action.password,
      };
    case types.START_ACT_FACEBOOK_LOGIN:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_ACT_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        userName: action.userName,
        nickName: action.nickName,
      };
    default:
      return state;
  }
}
