/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../courseList';
import { courses as dummyCourses } from '../../data/dummyData';


describe('CourseList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      courses: [],
      error: null,
    });
  });

  it('should handle course fetching errors', () => {
    expect(reducer({ courses: null }, {
      type: types.FETCH_COURSES_LIST_FAILURE,
      error: 'no internet',
    })).toEqual({
      courses: null,
      error: 'no internet',
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

  it('should load currentCourse when pressing a course', () => {
    expect(reducer({ courses: dummyCourses, currentCourse: null }, {
      type: types.LOAD_CURRENT_COURSE,
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

    state = reducer(state, { type: types.COMPLETE_CURRENT_LECTURE });

    expect(state.currentCourse.lectureProgress).toEqual(4);
  });
});
