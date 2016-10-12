import normalize from 'normalize-object';
import { handleActions } from 'redux-actions';

const initialState = {};

const coursesReducer = handleActions({
  FETCH_COURSES_LIST_SUCCESS: (state, action) => ({
    ...state,
    ...normalize(action.payload.entities.courses), // プロパティをキャメルケースに変換
  }),
}, initialState);

export default coursesReducer;
