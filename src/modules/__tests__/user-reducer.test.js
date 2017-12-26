/* eslint-disable no-undef */
import userReducer, {
  fetchFBEmailSuccess,
  fetchFBEmailFailure,
  startActFacebookLogin,
  fetchActLoginFailure,
  fetchActLoginSuccess
} from '../user';

jest.mock('bugsnag-react-native', () => 'Bugsnag');
jest.mock('react-native-i18n', () => ({ currentLocale: () => '' }));

describe('User reducer', () => {
  describe('Facebook graph request actions', () => {
    beforeEach(() => {
      loggedOut = { loggedIn: false };
      loggedIn = {
        // NOTE: successful facebook login does not set loggedIn to true,
        // we still need to query ACT API.
        loggedIn: false,
        facebookId: '12345',
        email: 'a@example.com'
      };
    });

    it('should handle successful login', () => {
      expect(
        userReducer(loggedOut, fetchFBEmailSuccess(['a@example.com', '12345']))
      ).toEqual(loggedIn);
    });

    it('should handle failed login', () => {
      expect(userReducer(loggedOut, fetchFBEmailFailure())).toEqual(loggedOut);
    });
  });

  describe('ACT login facebook actions', () => {
    beforeEach(() => {
      loggedOut = { loggedIn: false };
      fetching = {
        loggedIn: false,
        email: 'user@example.com',
        facebookId: '1234567890'
      };
      loggedIn = {
        loggedIn: true,
        email: 'user@example.com',
        facebookId: '1234567890',
        userName: 'username',
        nickName: 'nickname',
        isTemporary: false
      };
    });

    it('should handle start login', () => {
      expect(
        userReducer(
          loggedOut,
          startActFacebookLogin(['user@example.com', '1234567890'])
        )
      ).toEqual(fetching);
    });

    it('should handle failure login', () => {
      expect(userReducer(loggedOut, fetchActLoginFailure())).toEqual(loggedOut);
    });

    it('should handle success login', () => {
      expect(
        userReducer(
          fetching,
          fetchActLoginSuccess({
            userName: 'username',
            nickName: 'nickname'
          })
        )
      ).toEqual(loggedIn);
    });
  });
});
