/* @flow */
import * as types from '../../constants/ActionTypes';

export const initialState = {
  currentLectureId: 0,
  isLastLecture: false,
};

const lectureViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_LECTURE_ID: {
      return {
        ...state,
        currentLectureId: action.lectureId,
      };
    }
    default:
      return state;
  }
};

export default lectureViewReducer;
