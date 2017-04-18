/**
 * @flow
 */
/* global fetch */
import Promise from 'bluebird';
import { Client as Bugsnag } from 'bugsnag-react-native';
import HttpError from 'standard-http-error';

import { API_ROOT, ACT_API_KEY } from '../lib/constants';

const EventEmitter = require('event-emitter');

const TIMEOUT = 60 * 1000;

/**
 * All HTTP errors are emitted on this channel for interested listeners
 */
export const errors = new EventEmitter();

/**
 * timeout
 * @param promise
 * @param ms
 */
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

/**
 * bodyOf
 * @param requestPromise
 * @returns {Promise.<void>}
 */
async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}

/**
 * url
 * @param path
 * @returns {string}
 */
export function url(path) {
  return path.indexOf('/') === 0
    ? API_ROOT + path
    : `${API_ROOT}/${path}`;
}

/**
 * logError
 * @param error
 * @param endpoint
 * @param method
 */
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`; // eslint-disable-line
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  } else {
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`);
  }
}

/**
 * getErrorMessageSafely
 * @param response
 * @returns {Promise.<*>}
 */
async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return '';
    }

    const payload = JSON.parse(body);
    if (payload && payload.message) {
      return payload.message;
    }

    return body;
  } catch (e) {
    return response._bodyInit; // eslint-disable-line
  }
}

/**
 * handleResponse
 * @param path
 * @param response
 * @returns {Promise.<{status: number, headers, body: null}>}
 */
async function handleResponse(path, response) {
  try {
    const status = response.status;

    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const error = new HttpError(status, message);

      errors.emit(status.toString(), { path, message: error.message });
      errors.emit('*', { path, message: error.message }, status);

      throw error;
    }

    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null,
    };
  } catch (e) {
    throw e;
  }
}

/**
 * getRequestHeaders
 * @param body
 * @param header
 * @returns {*}
 */
function getRequestHeaders(body, header) {
  const headers = body
    ? { Accept: 'application/json', 'Content-Type': 'application/json', 'app-api-key': ACT_API_KEY }
    : { Accept: 'application/json', 'app-api-key': ACT_API_KEY };


  if (header) {
    return { ...headers, ...header };
  }

  return headers;
}

/**
 * sendRequest
 * @param method
 * @param path
 * @param body
 * @param header
 * @returns {Promise.<*>}
 */
async function sendRequest(method, path, body, header) {
  try {
    const endpoint = url(path);
    const headers = getRequestHeaders(body, header);
    const options = body
      ? { method, headers, body: JSON.stringify(body) }
      : { method, headers };

    console.log('sendRequest:endpoint', endpoint);
    console.log('sendRequest:options', options);

    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * request
 * @param method
 * @param path
 * @param body
 * @param header
 * @returns {Promise}
 */
export async function request(method, path, body, header) {
  try {
    const response = await sendRequest(method, path, body, header);
    return handleResponse(
      path,
      response,
    );
  } catch (error) {
    logError(error, url(path), method);
    new Bugsnag().notify(error);
    throw error;
  }
}

/**
 * get
 * @param path
 * @param header
 * @returns {Promise}
 */
export async function get(path, header) {
  return bodyOf(request('get', path, null, header));
}

/**
 * patch
 * @param path
 * @param body
 * @param header
 * @returns {Promise}
 */
export async function patch(path, body, header) {
  return bodyOf(request('patch', path, body, header));
}

/**
 * post
 * @param path
 * @param body
 * @param header
 * @returns {Promise}
 */
export async function post(path, body, header) {
  return bodyOf(request('post', path, body, header));
}

/**
 * put
 * @param path
 * @param body
 * @param header
 * @returns {Promise}
 */
export async function put(path, body, header) {
  return bodyOf(request('put', path, body, header));
}

/**
 * del
 * @param path
 * @param header
 * @returns {Promise}
 */
export async function del(path, header) {
  return bodyOf(request('delete', path, null, header));
}
