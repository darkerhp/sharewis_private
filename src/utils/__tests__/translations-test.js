/* eslint-disable no-undef */
import I18n from 'react-native-i18n';
import setupI18n from '../translations';


describe('Course Utils', () => {
  beforeAll(() => {
    setupI18n();
  });

  it('should support japanese, english and vietnamese', () => {
    expect(Object.keys(I18n.translations)).toEqual(['ja', 'en', 'vi']);
  });
  it('should have the same number of translations for each language', () => {
    const jaKeysNb = Object.keys(I18n.translations.ja).length;
    const enKeysNb = Object.keys(I18n.translations.en).length;
    const viKeysNb = Object.keys(I18n.translations.vi).length;
    expect(jaKeysNb).toEqual(enKeysNb);
    expect(jaKeysNb).toEqual(viKeysNb);
  });
});
