import React from 'react-native'

const {
  ListView
} = React;

import { combineReducers } from "redux";
import * as types from "../actions/courses";

const defaultState = {
  isLoading: false,
  isLoadingTail: false,
  hasCoursesToDisplay: false,
  filter: '',
  courses: []
}

const courseReducer = (state = defaultState, action) => {
  switch (action.type) {
  case types.FETCHING_COURSES:
    return {
    ...state,
    isLoading: true,
    };

  case types.FETCHING_NEXT_PAGE_COURSES:

    return {
    ...state,
    isLoadingTail: true,
    };

  case types.ERROR_GETTING_COURSES:
    return {
    ...state,
    isLoading: false,
    isLoadingTail: false,
    courses: []
    };

  case types.RECEIVED_DATA:
    return {
    ...state,
    isLoading: false,
    isLoadingTail: false,
    hasCoursesToDisplay: action.data.total != action.data.courses.length,
    filter: action.data.filter,
    courses: action.data.courses
    };

  default:
    return state;
  }
};

const rootReducer = combineReducers({
  courseData : courseReducer
});

export default rootReducer;
