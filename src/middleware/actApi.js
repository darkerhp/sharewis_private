/**
 * @flow
 */
/* global fetch */
import { ACT_API_URL, ACT_API_KEY } from '../constants/Api';
import { checkStatus, checkResult } from '../utils/api';


const getHeaders = userId => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'app-api-key': ACT_API_KEY,
  'user-id': userId,
});

export const getUserCourses = async (userId) => {
  // Run query
  const result = await fetch(`${ACT_API_URL}/my_courses`, {
    headers: getHeaders(userId),
  });
  console.log('headers', getHeaders(userId));
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, courses => courses.data);

  // Parse and return results
  return json.data;
};


export const foo = 'bar';
