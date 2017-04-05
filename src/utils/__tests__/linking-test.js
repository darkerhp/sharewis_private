/* eslint-disable no-undef */
/* eslint-disable global-require */
import redirectTo from '../linking';

global.Promise = require.requireActual('promise');

jest.mock('Linking', () => {
  const ACT_API_URL = require('../../lib/constants');

  return {
    canOpenURL: url =>
      new Promise((resolve) => {
        resolve(url === ACT_API_URL);
      }),
    openURL: url => new Promise(resolve => resolve(url)),
  };
});

jest.mock('bugsnag-react-native', () => 'Bugsnag');

describe('Linking Utils', () => {
  const ACT_API_URL = require('../../lib/constants');

  it('should redirect to the given url', () =>
    redirectTo(ACT_API_URL).then(result =>
      expect(result).toEqual(ACT_API_URL),
    ),
  );
});
