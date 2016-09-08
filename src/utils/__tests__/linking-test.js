/* eslint-disable no-undef */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import redirectTo from '../linking';
import { ACT_API_URL } from '../../constants/Api';

global.Promise = require.requireActual('promise');

jest.mock('Linking', () => ({
  canOpenURL: url =>
    new Promise(resolve => {
      resolve(url === 'https://staging-act.share-wis.com');
    }),
  openURL: url => new Promise(resolve => resolve(url)),
}));

describe('Linking Utils', () => {
  it('should redirect to the given url', () =>
    redirectTo(ACT_API_URL).then(result =>
      expect(result).toEqual(ACT_API_URL)
    )
  );
});
