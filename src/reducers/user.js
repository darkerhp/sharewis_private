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
};


export default function user(state = initialState, action) {
  switch (action.type) {
    case types.ADD_EMAIL:
      return { ...state, email: action.email };
    case types.ADD_PASSWORD:
      return { ...state, password: action.password };
    case types.FETCH_FB_EMAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
      };
    case types.FETCH_FB_EMAIL_SUCCESS:
      return {
        ...state,
        email: action.email,
        facebookId: action.facebookId,
        isFetching: true,
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
    case types.FETCH_ACT_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
      };

    default:
      return state;
  }
}
