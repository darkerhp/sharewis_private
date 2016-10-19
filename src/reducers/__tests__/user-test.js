/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../user';
import * as actions from '../../actions/login';

describe('User reducer', () => {
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
      expect(reducer(loggedOut, actions.fetchFBEmailSuccess([
        'a@example.com',
        '12345',
      ]))).toEqual(loggedIn);
    });

    it('should handle failed login', () => {
      expect(reducer(loggedOut, actions.fetchFBEmailFailure())).toEqual(loggedOut);
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
      expect(reducer(loggedOut, actions.startActFacebookLogin([
        'user@example.com',
        '1234567890',
      ]))).toEqual(fetching);
    });

    it('should handle failure login', () => {
      expect(reducer(loggedOut, actions.fetchActLoginFailure())).toEqual(loggedOut);
    });

    it('should handle success login', () => {
      expect(reducer(fetching, actions.fetchActLoginSuccess({
        userName: 'username',
        nickName: 'nickname',
      }))).toEqual(loggedIn);
    });
  });
});
