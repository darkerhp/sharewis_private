/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../user';

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

  describe('Facebook graph request actions', () => {
    beforeEach(() => {
      loggedOut = { isFetching: false, loggedIn: false };
      loggedIn = {
        // NOTE: successful facebook login does not set loggedIn to true,
        // we still need to query ACT API.
        isFetching: true,
        loggedIn: false,
        facebookId: '12345',
        email: 'a@example.com',
      };
    });

    it('should handle successful login', () => {
      expect(reducer(loggedOut, {
        type: types.FETCH_FB_EMAIL_SUCCESS,
        facebookId: '12345',
        email: 'a@example.com',
      })
      ).toEqual(loggedIn);
    });

    it('should handle failed login', () => {
      expect(
        reducer(loggedOut, { type: types.FETCH_FB_EMAIL_FAILURE })
      ).toEqual(loggedOut);
    });
  });

  describe('ACT login facebook actions', () => {
    beforeEach(() => {
      loggedOut = { isFetching: false, loggedIn: false };
      fetching = { isFetching: true, loggedIn: false };
      loggedIn = {
        isFetching: false,
        loggedIn: true,
        userName: 'username',
        nickName: 'nickname',
      };
    });

    it('should handle start login', () => {
      expect(
        reducer(loggedOut, { type: types.START_ACT_FACEBOOK_LOGIN })
      ).toEqual(fetching);
    });

    it('should handle failure login', () => {
      expect(
        reducer(fetching, { type: types.FETCH_ACT_LOGIN_FAILURE })
      ).toEqual(loggedOut);
    });

    it('should handle success login', () => {
      expect(
        reducer(fetching, {
          type: types.FETCH_ACT_LOGIN_SUCCESS,
          userName: 'username',
          nickName: 'nickname',
        })
      ).toEqual(loggedIn);
    });
  });
});
