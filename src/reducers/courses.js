/* @flow */
import * as types from '../constants/ActionTypes';

const initialState = {
  courses: ['コース１', 'コース２'],
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
