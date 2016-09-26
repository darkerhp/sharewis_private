/* global __DEV__ */

let ACCOUNT_API_HOST = 'account.share-wis.com';
let ACCOUNT_API_BASE_PATH = '';
let ACT_API_HOST = 'act.share-wis.com';
let actApiKey = '?????????';  // TODO


if (__DEV__) {
  ACCOUNT_API_HOST = 'dev-account.share-wis.com';
  ACCOUNT_API_BASE_PATH = '/dev';
  ACT_API_HOST = 'staging-act.share-wis.com';
  actApiKey = 'Pr4BP2BedViT6Gjm2aiwRJAy6ziTs2i6yGrsyTp9';
}


export const ACCOUNT_API_URL = `https://${ACCOUNT_API_HOST}${ACCOUNT_API_BASE_PATH}`;
export const ACT_API_URL = `https://${ACT_API_HOST}`;
export const ACT_API_KEY = actApiKey;


export const PASSWORD_FORGOTTEN_URL = `${ACT_API_URL}/users/password/new`;
