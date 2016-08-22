export const FETCHING_COURSES = "FETCHING_COURSES";
export const FETCHING_NEXT_PAGE_COURSES = "FETCHING_NEXT_PAGE_COURSES";
export const RECEIVED_DATA = "RECEIVED_DATA";
export const ERROR_GETTING_COURSES = "ERROR_GETTING_COURSES";

import courseService from '../middleware/courseService'

export const fetchCourses = (): Object => {
  return {
    type: FETCHING_COURSES
  }
}

export const fetchingNextPageCourses = (): Object => {
  return {
    type: FETCHING_NEXT_PAGE_COURSES
  }
}

export const searchCourses = (filter: string): Function => {
  return (dispatch) => {
    dispatch(fetchCourses());
    //courseService.fetchCourses(filter, dispatch);
  };
};

export const getCoursesNextPage = (filter: string): Function => {
  return (dispatch) => {
    dispatch(fetchingNextPageCourses());
    courseService.getNextPage(filter, dispatch);
  };
};

export const errorOnReceivingMoving = (): Object => {
  return {
    type: ERROR_GETTING_COURSES,
  };
};

export const retrievedCourses = (data: Object): Object => {
  return {
    type: RECEIVED_DATA,
    data
  };
};

export const fetchData = (): Function => {
  return (dispatch) => {
    dispatch(requestData());
    return setTimeout(() => {
      const data = {message: "Hello"};
      dispatch(receiveData(data));
    }, 300);
  };
};
