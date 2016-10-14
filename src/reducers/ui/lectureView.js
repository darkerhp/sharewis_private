/* @flow */
import { handleActions } from 'redux-actions';

const initialState = {
  currentLectureId: 0,
  isLastLecture: false,
};

const lectureViewReducer = handleActions({
  SET_CURRENT_LECTURE_ID: (state, action) => ({
    ...state,
    currentLectureId: action.payload,
  }),
}, initialState);

export default lectureViewReducer;
