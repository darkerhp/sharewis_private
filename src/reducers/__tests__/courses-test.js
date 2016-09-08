/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../courses';


describe('Course reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      courses: null,
    });
  });

  it('should add received courses to the props', () => {
    expect(reducer({ courses: null }, {
      type: types.FETCH_COURSES_LIST_SUCCESS,
      courses: ['コース１', 'コース２'],
    })).toEqual({
      courses: ['コース１', 'コース２'],
    });
  });
});
