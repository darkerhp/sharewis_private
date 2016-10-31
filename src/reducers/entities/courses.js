import _ from 'lodash';
import Immutable from 'immutable';
import normalize from 'normalize-object';
import { handleActions } from 'redux-actions';

const initialState = {};

const coursesReducer = handleActions({
  FETCH_COURSES_LIST_SUCCESS: (state, action) => ({
    ...state,
    ...normalize(action.payload.entities.courses), // プロパティをキャメルケースに変換
  }),
  UPDATE_COURSE_DOWNLOADED_STATUS: (state, action) => {
    if (_.isEmpty(state)) return state;
    return Immutable.fromJS(state).mergeDeep(action.payload).toJS();
  },
}, initialState);

export default coursesReducer;
