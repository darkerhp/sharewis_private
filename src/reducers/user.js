/* @flow */
import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_SUCCESS,
  START_EMAIL_LOGIN,
  START_FACEBOOK_LOGIN,
} from '../actions/login';

const initialState = {
  user: null,
  password: null,
  facebookId: null,
};

const user: Function = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
      };
    case START_EMAIL_LOGIN:
      return {
        ...state,
        email: state.email,
        isFetching: true,
        password: state.password,
      };
    case START_FACEBOOK_LOGIN:
      return {
        ...state,
        email: state.email,
        facebookId: state.facebookId,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default user;
