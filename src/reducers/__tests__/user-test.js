/* eslint-disable no-undef */
import reducer from '../user';
import * as types from '../../constants/ActionTypes';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      password: null,
      facebookId: null,
      userName: null,
      nickName: null,
      isFetching: false,
      loggedIn: false,
    });
  });

  it('should handle facebook graph request actions', () => {
    loggedOut = { isFetching: false, loggedIn: false };
    loggedIn = {
      isFetching: true,
      loggedIn: true,
      facebookId: '12345',
      email: 'a@example.com',
    };
    // Successful login
    expect(reducer(loggedOut, {
      type: types.FETCH_FB_EMAIL_SUCCESS,
      facebookId: '12345',
      email: 'a@example.com',
    })
    ).toEqual(loggedIn);
    // Failed login
    expect(
      reducer(loggedOut, { type: types.FETCH_FB_EMAIL_FAILURE })
    ).toEqual(loggedOut);
  });

  it('should handle ACT login facebook actions', () => {
    loggedOut = { isFetching: false, loggedIn: false };
    fetching = { isFetching: true, loggedIn: false };
    loggedIn = {
      isFetching: false,
      loggedIn: false,
      userName: 'username',
      nickName: 'nickname',
    };

    expect(
      reducer(loggedOut, { type: types.START_ACT_FACEBOOK_LOGIN })
    ).toEqual(fetching);
    expect(
      reducer(fetching, { type: types.FETCH_ACT_LOGIN_FAILURE })
    ).toEqual(loggedOut);
    expect(
      reducer(fetching, {
        type: types.FETCH_ACT_LOGIN_SUCCESS,
        userName: 'username',
        nickName: 'nickname',
      })
    ).toEqual(loggedIn);
  });
});
