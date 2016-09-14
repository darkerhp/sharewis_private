/**
* @flow
*/
/* eslint no-console: ["error", { allow: ["log"] }] */

import * as types from '../constants/ActionTypes';
import getUserData from '../middleware/accountApi';


// Actions Creators

export const enableEmailLogin = () => ({
  type: types.ENABLE_EMAIL_LOGIN,
  loginDisabled: true,
});

export const disableEmailLogin = () => ({
  type: types.DISABLE_EMAIL_LOGIN,
  loginDisabled: false,
});

export const startActEmailLogin = ([email, password]) => ({
  type: types.START_ACT_EMAIL_LOGIN,
  email,
  isFetching: true,
  password,
});

export const startActFacebookLogin = ([email, facebookId]) => ({
  type: types.START_ACT_FACEBOOK_LOGIN,
  email,
  facebookId,
  isFetching: true,
});

export const fetchActLoginFailure = {
  type: types.FETCH_ACT_LOGIN_FAILURE,
  isFetching: false,
  loggedIn: false,
};

export const fetchActLoginSuccess = result => ({
  type: types.FETCH_ACT_LOGIN_SUCCESS,
  isFetching: false,
  loggedIn: true,
  userName: result.userName,
  nickName: result.nickName,
});

export const fetchFBEmailFailure = () => ({
  type: types.FETCH_FB_EMAIL_SUCCESS,
  isFetching: false,
  loggedIn: false,
});

export const fetchFBEmailSuccess = ([email, facebookId]) => ({
  type: types.FETCH_FB_EMAIL_SUCCESS,
  loggedIn: true,
  email,
  facebookId,
});


// Thunks

export const fetchUserBy = (loginMethod, credentials) =>
  (async) (dispatch) => {
    if (loginMethod === 'facebook') {
      dispatch(fetchFBEmailSuccess(credentials));
    }

    dispatch(startActFacebookLogin(credentials));
    try {
      const data = await getUserData(credentials);
      return dispatch(fetchActLoginSuccess(data));
    } catch (error) {
      dispatch(fetchActLoginFailure);
      throw error;
    }
  };
