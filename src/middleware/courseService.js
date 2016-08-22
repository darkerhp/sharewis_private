/**
 * @flow
 */
/* global fetch */
import {
  errorOnReceivingMoving,
  // retrievedCourses,
} from '../actions/courses';

const API_URL = '';
const API_KEYS = [
  '',
];

const getUrlForQuery = (query: string, pageNumber: number, queryNumber: number): string => {
  const apiKey = API_KEYS[queryNumber % API_KEYS.length];
  if (query) {
    return (
      `${API_URL}courses.json?apikey=${apiKey}&q=\
      ${encodeURIComponent(query)}&page_limit=20&page=${pageNumber}`
    );
  }
  // With no query, load latest courses
  return (
    `${API_URL}...`
  );
};


class CourseService {
  constructor() {
    this.queryNumber = 0;
  }

  fetchCourses() {
    return null;
  }

  getNextPage(filter: string, dispatch: any) {
    const pageNumber = 1;
    const url = getUrlForQuery(filter, pageNumber, this.queryNumber);

    fetch(url)
      .then((response) => response.json())
      .catch(() => {
        dispatch(errorOnReceivingMoving());
      });
    return null;
  }
}

export default new CourseService();
