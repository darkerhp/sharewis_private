/**
 * @flow
 */
import courseService from '../middleware/courseService';

export const FETCHING_COURSES = 'FETCHING_COURSES';
export const FETCHING_NEXT_PAGE_COURSES = 'FETCHING_NEXT_PAGE_COURSES';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const ERROR_GETTING_COURSES = 'ERROR_GETTING_COURSES';

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

export const errorOnReceivingMoving = (): Object => ({
  type: ERROR_GETTING_COURSES,
});

export const retrievedCourses = (data: Object): Object => ({
  type: RECEIVED_DATA,
  data,
});

export const fetchData = (): Function =>
  setTimeout(() => 'something', 300);
