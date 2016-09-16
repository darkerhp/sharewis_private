/* @flow */
import * as types from '../constants/ActionTypes';
import { course } from '../data/dummyData'; // TODO

const initialState = {
  // Test empty course page
  // courses: null,
  // Test filled course page
  courses: [course],
};

const courses = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_LIST_SUCCESS:
      return {
        ...state,
        courses: action.courses,
      };
    default:
      return state;
  }
};


export default courses;
