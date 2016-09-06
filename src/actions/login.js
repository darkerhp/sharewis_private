/* @flow */
/* global fetch */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */

import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import * as types from '../constants/ActionTypes';
import { ACCOUNT_API_URL } from '../constants/Api';
// import { promisify } from '../utils';


// Actions Creators
export const startActEmailLogin = (email, password) => ({
  type: types.START_ACT_EMAIL_LOGIN,
  email,
  isFetching: true,
  password,
});

export const startActFacebookLogin = (email, facebookId) => ({
  type: types.START_ACT_FACEBOOK_LOGIN,
  email,
  facebookId,
  isFetching: true,
});

export const fetchActLoginFailure = error => ({
  type: types.FETCH_ACT_LOGIN_FAILURE,
  error,
  isFetching: false,
  loggedIn: false,
});

export const fetchActLoginSuccess = result => ({
  type: types.FETCH_ACT_LOGIN_SUCCESS,
  isFetching: false,
  loggedIn: true,
  result,
});

export const fetchFBEmailSuccess = email => ({
  type: types.FETCH_FB_EMAIL_SUCCESS,
  loggedIn: true,
  email,
});


// Thunks

export const fetchUser = (loginMethod, credentials) =>
  async dispatch => {
    console.log('in dispatch');
    const nextAction = {
      facebook: startActFacebookLogin,
      email: startActEmailLogin,
    }[loginMethod];
    console.log('next action', nextAction);
    const result = await fetch(ACCOUNT_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${credentials[0]}:${credentials[1]}`,
      },
    });
    console.log('QUERY DONE!', result);
    return dispatch(nextAction)(credentials);
  };


export const fetchUserFromFacebook = () =>
  async dispatch => {
    console.log('in fetchEmailFromFbGraph');
    // const infoRequest = promisify(GraphRequest.constructor, '/me?fields=email', null);
    const callback = result => dispatch(fetchUser('facebook', result));
    const infoRequest = new GraphRequest('/me?fields=email', null, callback);
    console.log('create requestManager');
    const requestManager = new GraphRequestManager().addRequest(infoRequest);
    console.log('start request');
    const result = requestManager.start();
    console.log('result from fetchUserFromFacebook', result);
    return dispatch(fetchUser('facebook', result));
  };
