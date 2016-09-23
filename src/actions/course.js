/* @flow */
import * as types from '../constants/ActionTypes';

export const a = 1;

export const getNextLecture = lectureId => ({
  type: types.GET_NEXT_LECTURE,
  lectureId,
});
