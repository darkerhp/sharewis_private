/**
* @flow
*/
/* eslint no-console: ["error", { allow: ["error", "log"] }] */

import * as types from '../constants/ActionTypes';
import { getUserData } from '../utils/accountApi';


// Actions Creators
export const startActEmailLogin = ([email, password]) => ({
  type: types.START_ACT_EMAIL_LOGIN,
  email,
  isFetching: true,
  password,
});

export const startActFacebookLogin = ([email, facebookId]) => {
  console.log('startActFacebookLogin', email, facebookId);
  return {
    type: types.START_ACT_FACEBOOK_LOGIN,
    email,
    facebookId,
    isFetching: true,
  };
};

export const fetchActLoginFailure = error => ({
  type: types.FETCH_ACT_LOGIN_FAILURE,
  error,
  isFetching: false,
  loggedIn: false,
});

export const fetchActLoginSuccess = result => {
  console.log('fetchActLoginSuccess', result);
  return {
    type: types.FETCH_ACT_LOGIN_SUCCESS,
    isFetching: false,
    loggedIn: true,
    userName: result.userName,
    nickName: result.nickName,
  };
};

export const fetchFBEmailSuccess = (email, facebookId) => ({
  type: types.FETCH_FB_EMAIL_SUCCESS,
  loggedIn: true,
  email,
  facebookId,
});


// Thunks

export const fetchUserByFacebook = (loginMethod, credentials) =>
  async dispatch => {
    console.log('credentials', credentials);
    dispatch(startActFacebookLogin(credentials));
    try {
      const data = await getUserData(credentials);
      return dispatch(fetchActLoginSuccess(data));
    } catch (error) {
      return dispatch(fetchActLoginFailure(error));
    }
  };
