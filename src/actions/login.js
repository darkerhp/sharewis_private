/**
* @flow
*/

import * as types from '../constants/ActionTypes';
import getUserData from '../middleware/accountApi';


// Actions Creators

export const startActEmailLogin = ([email, password]) => ({
  type: types.START_ACT_EMAIL_LOGIN,
  email,
  password,
});

export const startActFacebookLogin = ([email, facebookId]) => ({
  type: types.START_ACT_FACEBOOK_LOGIN,
  email,
  facebookId,
});

export const fetchActLoginFailure = {
  type: types.FETCH_ACT_LOGIN_FAILURE,
};

export const fetchActLoginSuccess = result => ({
  type: types.FETCH_ACT_LOGIN_SUCCESS,
  userName: result.userName,
  nickName: result.nickName,
});

export const fetchFBEmailFailure = () => ({
  type: types.FETCH_FB_EMAIL_FAILURE,
});

export const fetchFBEmailSuccess = ([email, facebookId]) => ({
  type: types.FETCH_FB_EMAIL_SUCCESS,
  email,
  facebookId,
});


// Thunks

export const fetchUserBy = (loginMethod, credentials) =>
  (async) (dispatch) => {
    if (loginMethod === 'facebook') {
      dispatch(fetchFBEmailSuccess(credentials));
      dispatch(startActFacebookLogin(credentials));
    } else {
      dispatch(startActEmailLogin(credentials));
    }

    try {
      const data = await getUserData(credentials);
      return dispatch(fetchActLoginSuccess(data));
    } catch (error) {
      dispatch(fetchActLoginFailure);
      throw error;
    }
  };
