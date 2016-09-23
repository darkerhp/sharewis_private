/* @flow */
import * as types from '../constants/ActionTypes';


const initialState = {
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
        currentLecture: action.currentCourse,
      };
    case types.COMPLETE_CURRENT_LECTURE: {
      const lectures = state.lectures.map(l => (
        l.id !== state.id ? l : { ...l, isCompleted: true }
      ));
      return {
        ...state,
        lectures,
        lectureProgress: state.lectureProgress + 1,
      };
    }
    default:
      return state;
  }
};


export default courseReducer;
