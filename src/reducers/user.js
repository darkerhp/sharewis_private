/* @flow */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import * as types from '../constants/ActionTypes';

const initialState = {
  user: null,
  password: null,
  facebookId: null,
  userName: null,
  nickName: null,
  isFetching: false,
  loggedIn: false,
};


export default function user(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FB_EMAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
      };
    case types.FETCH_FB_EMAIL_SUCCESS:
      console.log('REDUCER FETCH_FB_EMAIL_SUCCESS');
      console.log(state);
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
      };
    case types.START_ACT_EMAIL_LOGIN:
      return {
        ...state,
        email: state.email,
        isFetching: true,
        password: state.password,
      };
    case types.START_ACT_FACEBOOK_LOGIN:
      console.log('REDUCER START_ACT_FACEBOOK_LOGIN');
      console.log(state);
      return {
        ...state,
        email: state.email,
        facebookId: state.facebookId,
        isFetching: true,
      };
    default:
      return state;
  }
}
