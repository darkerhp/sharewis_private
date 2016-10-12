import _ from 'lodash';
import * as types from '../../constants/ActionTypes';

const initialState = { isFetching: false };

const courseListViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_LIST_START:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_COURSES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case types.FETCH_COURSES_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default courseListViewReducer;
