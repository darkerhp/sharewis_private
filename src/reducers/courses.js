/* @flow */
import * as types from '../constants/ActionTypes';
import { courses } from '../data/dummyData'; // TODO


const coursesReducer = (state = { courses }, action) => {
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


export default coursesReducer;
