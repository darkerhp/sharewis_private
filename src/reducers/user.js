/* @flow */
import { EMAIL_LOGIN, FACEBOOK_LOGIN } from '../constants/ActionTypes';

const initialState = {
  user: null,
  password: null,
  facebookId: null,
};

const user: Function = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_LOGIN:
      return {
        ...state,
        email: state.email,
        password: state.password,
      };
    case FACEBOOK_LOGIN:
      return {
        email: state.email,
        facebookId: state.facebookId,
      };
    default:
      return state;
  }
};

export default user;
