/**
 * @flow
 */

const API_URL = '';
const API_KEYS = [
  '',
];

export const FETCHING_COURSES = 'FETCHING_COURSES';
export const FETCHING_NEXT_PAGE_COURSES = 'FETCHING_NEXT_PAGE_COURSES';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const ERROR_GETTING_COURSES = 'ERROR_GETTING_COURSES';

export const errorOnReceivingMoving = (): Object => ({
  type: ERROR_GETTING_COURSES,
});

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

    /* global fetch */
    fetch(url)
      .then((response) => response.json())
      .catch(() => {
        dispatch(errorOnReceivingMoving());
      });
    return null;
  }
}
const courseService = new CourseService();

export const fetchCourses = (): Object => ({
  type: FETCHING_COURSES,
});

export const fetchingNextPageCourses = (): Object => ({
  type: FETCHING_NEXT_PAGE_COURSES,
});

export const searchCourses = (filter: string): Function =>
  (dispatch) => {
    dispatch(fetchCourses());
    courseService.fetchCourses(filter, dispatch);
  };

export const getCoursesNextPage = (filter: string): Function =>
  (dispatch) => {
    dispatch(fetchingNextPageCourses());
    courseService.getNextPage(filter, dispatch);
  };

export const retrievedCourses = (data: Object): Object => ({
  type: RECEIVED_DATA,
  data,
});

export const fetchData = (): Function =>
  setTimeout(() => 'something', 300);
