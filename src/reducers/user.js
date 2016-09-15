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
  const newState = {
    isFetching: action.isFetching,
    loggedIn: action.loggedIn,
  };
  switch (action.type) {
    case types.FETCH_FB_EMAIL_FAILURE:
    case types.FETCH_ACT_LOGIN_FAILURE:
      return {
        ...state,
        ...newState,
      };
    case types.FETCH_FB_EMAIL_SUCCESS:
      return {
        ...state,
        ...newState,
        email: action.email,
        facebookId: action.facebookId,
      };
    case types.START_ACT_EMAIL_LOGIN:
      return {
        ...state,
        ...newState,
        password: action.password,
      };
    case types.START_ACT_FACEBOOK_LOGIN:
      return {
        ...state,
        ...newState,
        email: action.email,
        facebookId: action.facebookId,
      };
    case types.FETCH_ACT_LOGIN_SUCCESS:
      return {
        ...state,
        ...newState,
        userName: action.userName,
        nickName: action.nickName,
      };
    default:
      return state;
  }
}
