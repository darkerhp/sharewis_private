/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../courses';


describe('Course reducer', () => {
  it('should return the initial state', () => {
    const courses = reducer(undefined, {}).courses;
    expect(courses[0].title).toEqual('差がつくビジネス戦略講座 | 事業開発・Platform戦略(R)・ITマーケティング');
    expect(courses[0].lectures[0].title).toEqual('セクション１');
    expect(courses[0].lectures[1].url).toEqual('http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin');
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
