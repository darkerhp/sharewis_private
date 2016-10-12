/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import { ACT_API_CACHE } from '../../constants/Api';
import reducer from '../courseList';
import { courses as dummyCourses } from '../../data/dummyData';


describe('CourseList reducer', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      courses: [],
      error: null,
      fetchedAt: -ACT_API_CACHE,
      isFetching: false,
    });
  });

  it('should handle course fetching errors', () => {
    expect(reducer({ courses: null }, {
      type: types.FETCH_COURSES_LIST_FAILURE,
      error: 'no internet',
    })).toEqual({
      courses: null,
      error: 'no internet',
      isFetching: false,
    });
  });

  it('should receive courses from api, camelCase the results and add them to the props', () => {
    apiResult = [{
      id: 0,
      image_url: 'http://a',
      lecture_count: 3,
      lecture_progress: 0,
      title: 'a',
    }];
    expect(reducer({ courses: null }, {
      type: types.FETCH_COURSES_LIST_SUCCESS,
      courses: apiResult,
    })).toEqual({
      courses: [{
        id: 0,
        imageUrl: 'http://a',
        lectureCount: 3,
        lectureProgress: 0,
        title: 'a',
      }],
      isFetching: false,
    });
  });

  it('should load currentCourse when pressing a course', () => {
    expect(reducer({ courses: dummyCourses, currentCourse: null }, {
      type: types.SET_CURRENT_COURSE_ID,
      currentCourse: dummyCourses[0],
    })).toEqual({
      courses: dummyCourses,
      currentCourse: dummyCourses[0],
    });
  });

  it('should update the lecture progress when action is triggered from Lecture', () => {
    let state = {
      courses: dummyCourses,
      currentCourse: {
        ...dummyCourses[0],
        currentLecture: {
          ...dummyCourses[0].lectures[10],
        },
      },
    };
    expect(state.currentCourse.lectureProgress).toEqual(3);

    state = reducer(state, { type: types.COMPLETE_LECTURE });

    expect(state.currentCourse.lectureProgress).toEqual(4);
  });
});
