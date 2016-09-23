import * as types from '../constants/ActionTypes';


export const setCurrentCourse = ({ lectures, lectureCount, lectureProgress }) => ({
  type: types.SET_CURRENT_COURSE,
  lectures,
  lectureCount,
  lectureProgress,
});

// Since we always import * as Actions
export const foo = 'bar';
