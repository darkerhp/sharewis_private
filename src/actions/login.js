export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN';
export const EMAIL_LOGIN = 'EMAIL_LOGIN';


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
