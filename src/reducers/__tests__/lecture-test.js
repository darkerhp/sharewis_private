/* eslint-disable no-undef */
import reducer, { apiData } from '../lecture';
import * as types from '../../constants/ActionTypes';
import { lectures } from '../../data/dummyData';


describe('Lecture reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentTime: 0,
      courseId: 0,
      estimatedTime: 0,
      hasVideoInDevice: false,
      id: 0,
      kind: null,
      isFullScreen: false,
      isLastLecture: false,
      isPaused: true,
      order: 0,
      lectures: [],
      speed: 1,
      status: 'not_started',
      title: undefined,
      type: null,
      videoUrl: undefined,
    });
  });

  it('should have test data matching api results', () => {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (key in apiData) {
      expect(Object.keys(lectures[1])).toContain(key);
    }
  });

  it('should handle SET_CURRENT_LECTURE_ID', () => {
    expect(reducer(undefined, {
      type: types.SET_CURRENT_LECTURE_ID,
      currentLecture: lectures[2],
      lectures,
    })).toEqual({
      currentTime: 0,
      courseId: 1,
      estimatedTime: 107,
      hasVideoInDevice: false,
      id: 2,
      isFullScreen: false,
      isLastLecture: false,
      isPaused: true,
      kind: 'lecture',
      lectures,
      order: 2,
      speed: 1,
      status: 'finished',
      title: 'レクチャーB',
      type: 'video',
      videoUrl: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
    });
  });

  it('should handle PRESS_PLAY', () => {
    expect(
      reducer({ isPaused: false }, { type: types.PRESS_PLAY })
    ).toEqual({
      isPaused: true,
    });
  });

  it('should handle PRESS_SPEED', () => {
    expect(
      reducer({ speed: 1 }, { type: types.PRESS_SPEED })
    ).toEqual({
      speed: 1.2,
    });

    // speed 2 to 1
    expect(
      reducer({ speed: 2 }, { type: types.PRESS_SPEED })
    ).toEqual({
      speed: 1,
    });
  });

  it('should handle UPDATE_VIDEO_PROGRESS', () => {
    expect(
      reducer({ currentTime: 0 }, { type: types.UPDATE_VIDEO_PROGRESS, currentTime: 1 })
    ).toEqual({
      currentTime: 1,
    });
  });
});
