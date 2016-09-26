/* @flow */
import * as types from '../constants/ActionTypes';
import { loadCurrentLecture, completeCurrentLecture } from '../utils/reducers';


const initialState = {
  currentLecture: undefined,
  lectureCount: 0,
  lectureProgress: 0,
  lectures: {},
};

const courseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        ...action.currentCourse,
      };
    case types.LOAD_CURRENT_LECTURE:
      return loadCurrentLecture(state, action);
    case types.COMPLETE_CURRENT_LECTURE: {
      return completeCurrentLecture(state);
    }
    default:
      return state;
  }
};


export default courseDetailsReducer;
