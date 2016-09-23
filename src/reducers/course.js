/* @flow */
import * as types from '../constants/ActionTypes';


const initialState = {
  lectures: {},
  lectureProgress: 0,
  lectureCount: 0,
};


const course = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NEXT_LECTURE: {
      debugger;
      return {
        ...state,
        currentLecture: state.course.lectures.find(
          l => l.id === action.lectureId + 1
        ),
      };
    }
    default:
      return state;
  }
};

export default course;
