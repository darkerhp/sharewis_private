/* global __DEV__ */
import * as localeUtil from '../utils/locale';

let ACT_API_HOST = 'share-wis.com';
let env = 'production';

const ACT_API_BASE_PATH = '/api';
const actApiKey = 'Pr4BP2BedViT6Gjm2aiwRJAy6ziTs2i6yGrsyTp9';

if (__DEV__) {
  ACT_API_HOST = 'staging1.share-wis.com';
  env = 'staging';
}

export const ACT_API_URL = `https://${ACT_API_HOST}${ACT_API_BASE_PATH}`;
export const ACT_API_KEY = actApiKey;

export const API_ROOT = ACT_API_URL;

export const ACT_SITE_URL = `https://${ACT_API_HOST}`;
export const ACT_INQUIRIES_URL = `https://support.share-wis.com/${localeUtil.getKayakoLocale()}/conversation/new`;
export const ACT_TOS_URL = `${ACT_SITE_URL}/tos`;
export const ACT_PRIVACY_URL = `${ACT_SITE_URL}/privacy`;
export const ACT_PASSWORD_REMINDER_URL = `${ACT_SITE_URL}/users/password/new`;
export const ACT_PRO_COURSES_URL = `${ACT_SITE_URL}/pro_courses`;

// Set 1h of caching (in ms)
export const ACT_API_CACHE = 60 * 60 * 1000;

export const ENV = env;
