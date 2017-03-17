/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/**
 * @flow
 * TODO これMiddlewareじゃない・・・
 */
/* global fetch */
import { Client } from 'bugsnag-react-native';

import { ACT_API_URL, ACT_API_KEY } from '../constants/Api';
import { checkStatus, checkResult } from '../utils/api';


const getHeaders = userId => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'app-api-key': ACT_API_KEY,
  'user-id': userId,
});

export const getUserCourses = async (userId: number) => {
  // Run query
  const result = await fetch(`${ACT_API_URL}/my_courses`, {
    headers: getHeaders(userId),
  });
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, (courses) => {
    if (courses.length > 0) {
      const { id } = courses[0];
      return typeof id === 'number';
    }
    return true;  // empty result without errors
  });

  // Parse and return results
  return json;
};

export const getSnackCourses = async (userId: number) => {
  // Run query
  const result = await fetch(`${ACT_API_URL}/snack_courses`, {
    headers: getHeaders(userId),
  });
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, (courses) => {
    if (courses.length > 0) {
      const { id } = courses[0];
      return typeof id === 'number';
    }
    return true;  // empty result without errors
  });

  // Parse and return results
  return json;
};

export const getCourseDetails = async (userId: number, courseId: number) => {
  // Run query
  const result = await fetch(`${ACT_API_URL}/courses/${courseId}`, {
    headers: getHeaders(userId),
  });
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, c => c.course && c.lectures);

  // Parse and return results
  return json;
};

export const patchLectureStatus = async (
  userId: number,
  courseId: number,
  lectureId: number,
  newStatus: string,
) => {
  try {
    // Run query
    const result = await fetch(`${ACT_API_URL}/courses/${courseId}/lectures/${lectureId}`, {
      method: 'PATCH',
      headers: getHeaders(userId),
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    // Verify results
    await checkStatus(result);
    const json = await result.json();
    // await checkResult(json, l => l.status === newStatus);

    // Parse and return results
    return json;
  } catch (error) {
    new Client().notify(error);
    console.error(error);
    throw error;
  }
};

/**
 * アカウントAPIのデータ補完用のpatchリクエスト
 * FIXME アカウントAPIの移行後、不要になったら削除予定
 * @param userId
 * @param locale
 * @returns {Promise.<*>}
 */
export const patchSignup = async (userId: number, locale: ?string) => {
  try {
    // Run query
    const result = await fetch(`${ACT_API_URL}/users/signup_patch`, {
      method: 'PATCH',
      headers: getHeaders(userId),
      body: JSON.stringify({
        language: locale,
        currency: null,
      }),
    });

    // Verify results
    await checkStatus(result);
    const json = await result.json();

    console.log('signup patch done:', json);

    // Parse and return results
    return json;
  } catch (error) {
    new Client().notify(error);
    console.error(error);
    throw error;
  }
};
