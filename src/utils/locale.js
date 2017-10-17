// @flow
import I18n from 'react-native-i18n';

export const isJa = () => I18n.currentLocale().indexOf('ja') !== -1;
export const isEn = () => I18n.currentLocale().indexOf('en') !== -1;
export const isVi = () => I18n.currentLocale().indexOf('vi') !== -1;

/**
 * @returns kayakoのURL用のlocale
 */
export const getKayakoLocale = () => {
  let kayakoLocale;
  if (isEn()) {
    kayakoLocale = 'en-us';
  } else if (isJa()) {
    kayakoLocale = 'ja';
  } else if (isVi()) {
    kayakoLocale = 'vi';
  }
  return kayakoLocale;
};

