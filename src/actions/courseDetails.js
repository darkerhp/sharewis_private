import * as types from '../constants/ActionTypes';


export const loadCurrentCourse = ({ lectures, lectureCount, lectureProgress }) => ({
  type: types.LOAD_CURRENT_COURSE,
  lectures,
  lectureCount,
  lectureProgress,
});

// Since we always import * as Actions
export const foo = 'bar';
