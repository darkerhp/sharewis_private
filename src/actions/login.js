/**
 * @flow
 */
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes';
import getUserData from '../middleware/accountApi';


// Actions Creators
export const startActEmailLogin = createAction(types.START_ACT_EMAIL_LOGIN,
  ([email, password]) => ({ email, password }));
export const startActFacebookLogin = createAction(types.START_ACT_FACEBOOK_LOGIN,
  ([email, facebookId]) => ({ email, facebookId }));
export const fetchActLoginFailure = createAction(types.FETCH_ACT_LOGIN_FAILURE);
export const fetchActLoginSuccess = createAction(types.FETCH_ACT_LOGIN_SUCCESS,
  (result) => {
    const { userName, nickName, userId } = result;
    return {
      userName,
      nickName,
      userId,
    };
  });
export const fetchFBEmailFailure = createAction(types.FETCH_FB_EMAIL_FAILURE);
export const fetchFBEmailSuccess = createAction(types.FETCH_FB_EMAIL_SUCCESS,
  ([email, facebookId]) => ({ email, facebookId }));

// Thunks
export const fetchUserBy = (loginMethod, credentials) =>
  async(dispatch) => {
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
      console.error(error);
      dispatch(fetchActLoginFailure);
      throw error;
    }
  };
