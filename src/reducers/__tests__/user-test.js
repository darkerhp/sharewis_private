/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../user';
import * as actions from '../../actions/login';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      password: null,
      facebookId: null,
      userName: null,
      nickName: null,
      isFetching: false,
      loggedIn: false,
      loginDisabled: true,
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
      const action = actions.fetchFBEmailSuccess([
        'a@example.com',
        '12345',
      ]);
      expect(action.type).toEqual(types.FETCH_FB_EMAIL_SUCCESS);
      expect(reducer(loggedOut, action)).toEqual(loggedIn);
    });

    it('should handle failed login', () => {
      const action = actions.fetchFBEmailFailure();
      expect(action.type).toEqual(types.FETCH_FB_EMAIL_FAILURE);
      expect(reducer(loggedOut, action)).toEqual(loggedOut);
    });
  });

  describe('ACT login facebook actions', () => {
    beforeEach(() => {
      loggedOut = { isFetching: false, loggedIn: false };
      fetching = {
        isFetching: true,
        loggedIn: false,
        email: 'user@example.com',
        facebookId: '1234567890',
      };
      loggedIn = {
        isFetching: false,
        loggedIn: true,
        email: 'user@example.com',
        facebookId: '1234567890',
        userName: 'username',
        nickName: 'nickname',
      };
    });

    it('should handle start login', () => {
      const action = actions.startActFacebookLogin([
        'user@example.com',
        '1234567890',
      ]);
      expect(action.type).toEqual(types.START_ACT_FACEBOOK_LOGIN);
      expect(reducer(loggedOut, action)).toEqual(fetching);
    });

    it('should handle failure login', () => {
      const action = actions.fetchActLoginFailure;
      expect(action.type).toEqual(types.FETCH_ACT_LOGIN_FAILURE);
      expect(reducer(loggedOut, action)).toEqual(loggedOut);
    });

    it('should handle success login', () => {
      const action = actions.fetchActLoginSuccess({
        userName: 'username',
        nickName: 'nickname',
      });
      expect(reducer(fetching, action)).toEqual(loggedIn);
    });
  });
});
