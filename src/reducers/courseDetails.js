/* @flow */
import * as types from '../constants/ActionTypes';


const initialState = {
  currentLecture: undefined,
  lectureCount: 0,
  lectureProgress: 0,
  lectures: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        ...action.currentCourse,
      };
    case types.LOAD_CURRENT_LECTURE:
      return {
        ...state,
        currentLecture: action.currentLecture,
      };
    case types.COMPLETE_CURRENT_LECTURE: {
      const currentLecture = {
        ...state.currentLecture,
        isCompleted: true,
      };
      const lectures = state.lectures.map(l => (
        l.id !== currentLecture.id ? l : currentLecture
      ));
      return {
        ...state,
        lectures,
        currentLecture,
        lectureProgress: state.lectureProgress + 1,
      };
    }
    default:
      return state;
  }
};


export default courseReducer;
