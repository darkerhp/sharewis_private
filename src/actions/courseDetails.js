import * as types from '../constants/ActionTypes';


// Used in courseDetails and lecture reducers
// eslint-disable-next-line import/prefer-default-export
export const loadCurrentLecture = (lectures, currentLecture) => ({
  type: types.LOAD_CURRENT_LECTURE,
  lectures,
  currentLecture,
});
