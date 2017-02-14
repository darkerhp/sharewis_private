/* eslint-disable no-undef */
import I18n from 'react-native-i18n';

import { isLocaleEn, isLocaleJa, isLocaleVi } from '../locale';

describe('locale', () => {
  describe('isLocaleEn', () => {
    it('should return true', () => {
      I18n.locale = 'en-US';
      expect(isLocaleEn()).toBeTruthy();
    });

    it('should return false', () => {
      I18n.locale = 'ja-JP';
      expect(isLocaleEn()).toBeFalsy();
    });
  });

  describe('isLocaleJa', () => {
    it('should return true', () => {
      I18n.locale = 'ja-JP';
      expect(isLocaleJa()).toBeTruthy();
    });

    it('should return false', () => {
      I18n.locale = 'en-US';
      expect(isLocaleJa()).toBeFalsy();
    });
  });

  describe('isLocaleVi', () => {
    it('should return true', () => {
      I18n.locale = 'vi-VN';
      expect(isLocaleVi()).toBeTruthy();
    });

    it('should return false', () => {
      I18n.locale = 'ja-JP';
      expect(isLocaleVi()).toBeFalsy();
    });
  });
});
