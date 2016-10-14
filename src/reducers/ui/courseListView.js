import { handleActions } from 'redux-actions';

const initialState = { isFetching: false };

const courseListViewReducer = handleActions({
  FETCH_COURSES_LIST_START: (state, action) => ({
    ...state,
    isFetching: true,
  }),
  FETCH_COURSES_LIST_FAILURE: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  FETCH_COURSES_LIST_SUCCESS: (state, action) => ({
    ...state,
    isFetching: false,
  }),
}, initialState);

export default courseListViewReducer;
