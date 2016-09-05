/* @flow */
import * as types from '../constants/ActionTypes';
import { ACCOUNT_API_URL } from '../constants/Api';


// Actions Creators
export const startEmailLogin = (email, password) => ({
  type: types.START_EMAIL_LOGIN,
  email,
  isFetching: true,
  password,
});

export const startFacebookLogin = (email, facebookId) => ({
  type: types.START_FACEBOOK_LOGIN,
  email,
  facebookId,
  isFetching: true,
});

export const fetchLoginFailure = error => ({
  type: types.FETCH_LOGIN_FAILURE,
  error,
  isFetching: false,
  loggedIn: false,
});

export const fetchLoginSuccess = result => ({
  type: types.FETCH_LOGIN_SUCCESS,
  isFetching: false,
  loggedIn: true,
  result,
});


// Thunks
export const fetchUser = (loginMethod, authorization) => (
  async dispatch => {
    const nextAction = {
      facebook: startFacebookLogin,
      email: startEmailLogin,
    }[loginMethod];
    dispatch(nextAction)(credentials);
    const result = await fetch(ACCOUNT_API_URL, {
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': authorization,
      },
    });
  }
);
