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
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, (courses) => {
    if (courses.length > 0) {
      const { id, title, image_url, lecture_count, lecture_progress } = courses[0];
      return typeof id === 'number';
    }
    return true;  // empty result without errors
  });

  // Parse and return results
  return json;
};


export const getCourseDetails = async (userId, courseId) => {
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


export const updateLectureStatus = async (userId, courseId, lectureId, newStatus) => {
  // Run query
  const result = await fetch(`${ACT_API_URL}/courses/${courseId}/lectures/${lectureId}`, {
    method: 'PATCH',
    headers: getHeaders(userId),
    body: `status="${newStatus}"`,
  });
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, l => l.status === newStatus);

  // Parse and return results
  return json;
};
