import { EMAIL_LOGIN, FACEBOOK_LOGIN } from '../constants/ActionTypes';


export const emailLogin = (email, password) => ({
  type: EMAIL_LOGIN,
  email,
  password,
});

export const facebookLogin = (email, facebookId) => ({
  type: FACEBOOK_LOGIN,
  email,
  facebookId,
});
