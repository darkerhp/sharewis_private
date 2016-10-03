import * as types from '../constants/ActionTypes';

export default function netInfoReducer(state = {}, action) {
  switch (action.type) {
    case types.MIDDLEWARE_NETINFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
