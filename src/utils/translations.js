import I18n from 'react-native-i18n';
import rawTranslations from '../data/translations.json';
import { ACT_SITE_URL } from '../constants/Api';


export default function setupI18n() {
  // Set localization
  let stringTranslations = JSON.stringify(rawTranslations);
  stringTranslations = stringTranslations.replace(/ACT_SITE_URL/gm, ACT_SITE_URL);
  I18n.fallbacks = true;
  I18n.defaultLocale = 'en-US';
  I18n.translations = JSON.parse(stringTranslations);
}
