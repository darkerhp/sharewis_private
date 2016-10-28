/* global __DEV__ */

let ACCOUNT_API_HOST = 'account.share-wis.com';
let ACCOUNT_API_BASE_PATH = '';
let ACT_API_HOST = 'act.share-wis.com';

const ACT_API_BASE_PATH = '/api';
const actApiKey = 'Pr4BP2BedViT6Gjm2aiwRJAy6ziTs2i6yGrsyTp9';

if (__DEV__) {
  ACCOUNT_API_HOST = 'dev-account.share-wis.com';
  ACCOUNT_API_BASE_PATH = '/dev';
  ACT_API_HOST = 'staging-act.share-wis.com';
}


export const ACCOUNT_API_URL = `https://${ACCOUNT_API_HOST}${ACCOUNT_API_BASE_PATH}`;
export const ACT_API_URL = `https://${ACT_API_HOST}${ACT_API_BASE_PATH}`;
export const ACT_API_KEY = actApiKey;

export const ACT_SITE_URL = `https://${ACT_API_HOST}`;
export const ACT_INQUIRIES_URL = `${ACT_SITE_URL}/inquiries/new`;
export const ACT_TOS_URL = `${ACT_SITE_URL}/tos`;
export const ACT_PRIVACY_URL = `${ACT_SITE_URL}/privacy`;
export const PASSWORD_FORGOTTEN_URL = `${ACT_SITE_URL}/users/password/new`;

// Lecture.kind
export const LECTURE_KIND_LECTURE = 'lecture';
export const LECTURE_KIND_SECTION = 'section';
// Lecture.type
export const LECTURE_TYPE_VIDEO = 'video';
export const LECTURE_TYPE_QUIZ = 'quiz';
export const LECTURE_TYPE_TEXT = 'text';
export const LECTURE_TYPE_PDF = 'pdf';
export const LECTURE_TYPE_ATTACHMENT = 'attachment';
export const LECTURE_TYPE_AUDIO = 'audio';
// Lecture.status
export const LECTURE_STATUS_NOT_STARTED = 'not_started';
export const LECTURE_STATUS_VIEWED = 'viewed';
export const LECTURE_STATUS_FINISHED = 'finished';


// Set 1h of caching (in ms)
export const ACT_API_CACHE = 60 * 60 * 1000;
