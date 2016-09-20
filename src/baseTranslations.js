/*
 * Main translation file
 */
import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.defaultLocale = 'en-US';

I18n.translations = {
  ja: {
    actWebsite: 'ShareWis ACTのWebサイト',
    errorTitle: 'エラー',
  },
  en: {
    actWebsite: "ShareWis ACT's website",
    errorTitle: 'Error',
  },
};


export default I18n;
