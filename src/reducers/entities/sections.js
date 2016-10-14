/* @flow */
import normalize from 'normalize-object';
import { handleActions } from 'redux-actions';

const sectionsReducer = handleActions({
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => ({
    ...state,
    ...normalize(action.payload.sections.entities.sections), // プロパティをキャメルケースに変換
  }),
}, {});

export default sectionsReducer;
