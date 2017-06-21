/* eslint-disable no-undef */
import { locales } from '../locales';

jest.mock('react-native-i18n', () => ({ currentLocale: () => '' }));

describe('Locales config', () => {
  it('should have the same number of translations for each language', () => {
    const jaKeysNb = Object.keys(locales.ja).length;
    const enKeysNb = Object.keys(locales.en).length;
    const viKeysNb = Object.keys(locales.vi).length;
    expect(jaKeysNb).toEqual(enKeysNb);
    expect(jaKeysNb).toEqual(viKeysNb);
  });
});
