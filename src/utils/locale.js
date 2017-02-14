// @flow
import I18n from 'react-native-i18n';

export const isLocaleJa = () => I18n.currentLocale().indexOf('ja') !== -1;
export const isLocaleEn = () => I18n.currentLocale().indexOf('en') !== -1;
export const isLocaleVi = () => I18n.currentLocale().indexOf('vi') !== -1;
