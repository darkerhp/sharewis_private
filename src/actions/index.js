import * as types from '../constants/ActionTypes';

// VideoLecture

export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});
export const pressSpeed = () => ({
  type: types.PRESS_SPEED,
});

export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});


// Login

export const emailLogin = (email, password) => ({
  type: types.EMAIL_LOGIN,
  email,
  password,
});

export const facebookLogin = (email, facebookId) => ({
  type: types.FACEBOOK_LOGIN,
  email,
  facebookId,
});
