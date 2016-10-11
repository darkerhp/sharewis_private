import normalize from 'normalize-object';
import * as types from '../../constants/ActionTypes';

const initialState = {};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_LIST_SUCCESS:
      return {
        ...state,
        ...normalize(action.response.entities.courses), // プロパティをキャメルケースに変換
      };
    default:
      return state;
  }
};

export default coursesReducer;
