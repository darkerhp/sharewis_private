/* eslint-disable no-undef */
import * as types from '../../constants/ActionTypes';
import { ACT_API_CACHE } from '../../constants/Api';
import { courses, lectures } from '../../data/dummyData';
import reducer from '../courseDetails';


describe('CourseDetails reducer', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentLecture: null,
      fetchedAt: -ACT_API_CACHE,
      id: 0,
      imageUrl: null,  // TODO unused
      isFetching: false,
      isLectureDownloading: false,
      jobId: -1,
      lectureCount: 0,
      lectureProgress: 0,
      lectures: [],
      title: null,
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
    expect(state.currentLecture.status).toEqual('not_started');

    state = reducer(state, { type: types.COMPLETE_CURRENT_LECTURE });

    expect(state.lectureProgress).toEqual(4);
    expect(state.currentLecture.status).toBeTruthy();
  });

  it('should handle PRESS_DOWNLOAD_VIDEO', () => {
    expect(
      reducer({ isLectureDownloading: false }, { type: types.PRESS_DOWNLOAD_VIDEO }))
      .toEqual({ isLectureDownloading: true }
      );
  });

  it('should handle BEGIN_DOWNLOAD_VIDEO', () => {
    const state = { ...courses[0], lectures };
    const action = { type: types.BEGIN_DOWNLOAD_VIDEO, lectureId: 1, jobId: 1 };
    const reducedState = reducer(state, action);

    expect(reducedState.lectures[1].isDownloading).toBeTruthy();
    expect(reducedState.jobId).toEqual(1);
  });

  it('should handle PROGRESS_DOWNLOAD_VIDEO', () => {
    const state = { ...courses[0], lectures };
    const action = { type: types.PROGRESS_DOWNLOAD_VIDEO, lectureId: 1, percentage: 99 };
    const reducedState = reducer(state, action);

    expect(reducedState.lectures[1].isDownloading).toBeTruthy();
    expect(reducedState.lectures[1].percentage).toEqual(99);
  });

  it('should handle FINISH_DOWNLOAD_VIDEO', () => {
    const state = { ...courses[0], lectures };
    const action = { type: types.FINISH_DOWNLOAD_VIDEO, lectureId: 1 };
    const reducedState = reducer(state, action);

    expect(reducedState.lectures[1].isDownloading).toBeFalsy();
    expect(reducedState.lectures[1].hasVideoInDevice).toBeTruthy();
  });

  it('should handle ERROR_DOWNLOAD_VIDEO', () => {
    const state = { ...courses[0], lectures };
    const action = { type: types.ERROR_DOWNLOAD_VIDEO, lectureId: 1 };
    const reducedState = reducer(state, action);

    expect(reducedState.lectures[1].isDownloading).toBeFalsy();
    expect(reducedState.lectures[1].hasVideoInDevice).toBeFalsy();
  });

  it('should handle UPDATE_VIDEO_IN_DEVICE_STATUS', () => {
    const state = { ...courses[0], lectures };
    const action = { type: types.UPDATE_VIDEO_IN_DEVICE_STATUS, lectures };
    const reducedState = reducer(state, action);
    expect(reducedState.lectures).toEqual(lectures);
  });

  it('should handle FINISH_DELETE_VIDEO', () => {
    const state = { ...courses[0], lectures };
    const action = { type: types.FINISH_DELETE_VIDEO, lectureId: 1 };
    const reducedState = reducer(state, action);

    expect(reducedState.lectures[1].hasVideoInDevice).toBeFalsy();
  });
});
