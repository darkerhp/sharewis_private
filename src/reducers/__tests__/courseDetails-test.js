/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import reducer from '../courseDetails';
import { courses, lectures } from '../../data/dummyData';


describe('CourseList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      id: 0,
      currentLecture: undefined,
      lectureCount: 0,
      lectureProgress: 0,
      lectures: [],
      jobId: -1,
      isLectureDownloading: false,
    });
  });

  it('should load current course when action is triggered from CourseList', () => {
    expect(reducer({ currentLecture: null }, {
      type: types.LOAD_CURRENT_COURSE,
      currentCourse: courses[0],
    })).toEqual({
      currentLecture: null,
      ...courses[0],
    });
  });

  it('should load current lecture', () => {
    expect(reducer({ lectures, currentLecture: null }, {
      type: types.LOAD_CURRENT_LECTURE,
      currentLecture: lectures[0],
    })).toEqual({
      lectures,
      currentLecture: lectures[0],
    });
  });

  it('should update the lecture progress when action is triggered from Lecture', () => {
    let state = {
      ...courses[0],
      currentLecture: {
        ...lectures[10],
      },
      lectures,
    };
    expect(state.lectureProgress).toEqual(3);
    expect(state.currentLecture.isCompleted).toBeFalsy();

    state = reducer(state, { type: types.COMPLETE_CURRENT_LECTURE });

    expect(state.lectureProgress).toEqual(4);
    expect(state.currentLecture.isCompleted).toBeTruthy();
  });
});
